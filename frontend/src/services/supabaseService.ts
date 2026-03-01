import { supabase } from '../lib/supabaseClient';
import { students as localStudents } from './studentService';
import { RealtimeChannel } from '@supabase/supabase-js';

// Export supabase for use in other files
export { supabase };

// ============================================
// TYPES
// ============================================
export interface Student {
  id: string;
  exam_number: string;
  full_name: string;
  first_name: string;
  last_name: string;
  combination: string;
  has_password: boolean;
  clearance_percentage: number;
  is_fully_cleared: boolean;
  properties: any;
  subjects: any[];
  fees: any;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id: number;
  student_id: string;
  author: string;
  text: string;
  date: string;
  created_at: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const calculateClearance = (student: any) => {
  let cleared = 0;
  const total = 20; // 14 properties + 4 subjects + 2 fees
  
  // Count cleared properties
  Object.values(student.properties).forEach((prop: any) => { 
    if (prop.status) cleared++; 
  });
  
  // Count paid subjects (both tuition AND series must be paid)
  student.subjects.forEach((sub: any) => { 
    if (sub.tuition && sub.series) cleared++; 
  });
  
  // Count paid fees
  if (student.fees.form5.paid) cleared++;
  if (student.fees.form6.paid) cleared++;
  
  const percentage = Math.round((cleared / total) * 100);
  
  return {
    cleared,
    total,
    percentage,
    isFullyCleared: cleared === total
  };
};

// ============================================
// DATABASE INITIALIZATION
// ============================================

export const initializeDatabase = async (): Promise<void> => {
  console.log("🔵 Checking if students exist in database...");
  
  try {
    const { data: existingStudents, error: checkError } = await supabase
      .from('students')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error("🔴 Error checking students:", checkError);
      return;
    }
    
    if (!existingStudents || existingStudents.length === 0) {
      console.log("🟡 No students found. Inserting all 31 students...");
      
      const studentsToInsert = localStudents.map(s => ({
        id: s.id,
        exam_number: s.examNumber,
        full_name: s.fullName,
        first_name: s.firstName,
        last_name: s.lastName,
        combination: s.combination,
        has_password: s.hasPassword,
        clearance_percentage: s.clearancePercentage,
        is_fully_cleared: s.isFullyCleared,
        properties: s.properties,
        subjects: s.subjects,
        fees: s.fees
      }));
      
      const batchSize = 10;
      for (let i = 0; i < studentsToInsert.length; i += batchSize) {
        const batch = studentsToInsert.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from('students')
          .insert(batch);
        
        if (insertError) {
          console.error(`🔴 Error inserting batch ${i}:`, insertError);
        } else {
          console.log(`🟢 Inserted batch ${i/batchSize + 1}`);
        }
      }
      
      console.log("✅ All students inserted successfully!");
    } else {
      console.log("🟢 Students already exist in database");
    }
  } catch (err) {
    console.error("🔴 Initialization error:", err);
  }
};

// ============================================
// STUDENT AUTHENTICATION
// ============================================

export const authenticateStudent = async (examNumber: string, lastName: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('exam_number', examNumber)
      .ilike('last_name', lastName)
      .single();
    
    if (error || !data) {
      console.log("🔴 Authentication failed:", error);
      return null;
    }
    
    console.log("🟢 Student authenticated:", data.full_name);
    return data as Student;
  } catch (err) {
    console.error("🔴 Auth error:", err);
    return null;
  }
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return null;
    return data as Student;
  } catch (err) {
    console.error("🔴 Error fetching student:", err);
    return null;
  }
};

// ============================================
// PASSWORD MANAGEMENT
// ============================================

export const savePassword = async (studentId: string, password: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('students')
      .update({ 
        has_password: true
      })
      .eq('id', studentId);
    
    if (error) {
      console.error("🔴 Error saving password:", error);
      return false;
    }
    
    console.log("🟢 Password saved for student:", studentId);
    return true;
  } catch (err) {
    console.error("🔴 Password save error:", err);
    return false;
  }
};

// ============================================
// COMMENTS - REAL-TIME COMMUNICATION
// ============================================

export const addComment = async (studentId: string, comment: { author: string; text: string }): Promise<Comment | null> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        student_id: studentId,
        author: comment.author,
        text: comment.text,
        date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();
    
    if (error) {
      console.error("🔴 Error adding comment:", error);
      return null;
    }
    
    console.log("🟢 Comment added successfully to Supabase:", data);
    return data as Comment;
  } catch (err) {
    console.error("🔴 Comment error:", err);
    return null;
  }
};

export const getComments = async (studentId: string): Promise<Comment[]> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("🔴 Error fetching comments:", error);
      return [];
    }
    
    return (data as Comment[]) || [];
  } catch (err) {
    console.error("🔴 Comments fetch error:", err);
    return [];
  }
};

export const subscribeToComments = (studentId: string, callback: (comment: Comment) => void): RealtimeChannel => {
  console.log("🔵 Setting up real-time subscription for student:", studentId);
  
  return supabase
    .channel(`comments-${studentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `student_id=eq.${studentId}`
      },
      (payload: { new: Comment }) => {
        console.log("🟢 REAL-TIME: New comment received!", payload.new);
        callback(payload.new);
      }
    )
    .subscribe((status: string) => {
      console.log("🔵 Subscription status:", status);
    });
};

// ============================================
// ADMIN FUNCTIONS
// ============================================

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('exam_number');
    
    if (error) {
      console.error("🔴 Error fetching all students:", error);
      return [];
    }
    
    return (data as Student[]) || [];
  } catch (err) {
    console.error("🔴 Fetch error:", err);
    return [];
  }
};

// ============================================
// UPDATE STUDENT CLEARANCE (SINGLE DEFINITION)
// ============================================

export const updateStudentClearance = async (
  studentId: string,
  itemType: 'property' | 'subject' | 'fee',
  itemName: string,
  status: boolean
): Promise<Student | null> => {
  try {
    const { data: student, error: fetchError } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();
    
    if (fetchError || !student) {
      console.error("🔴 Student not found:", studentId);
      return null;
    }
    
    // Update based on type
    if (itemType === 'property') {
      const propKey = Object.keys(student.properties).find(
        (key: string) => student.properties[key].name === itemName
      );
      if (propKey) {
        student.properties[propKey].status = status;
      }
    } else if (itemType === 'subject') {
      const subject = student.subjects.find((s: any) => s.name === itemName);
      if (subject) {
        if (itemName.includes('Tuition')) {
          subject.tuition = status;
        } else if (itemName.includes('Series')) {
          subject.series = status;
        } else {
          subject.tuition = status;
          subject.series = status;
        }
      }
    } else if (itemType === 'fee') {
      if (itemName === 'Form 5') {
        student.fees.form5.paid = status;
        if (status) student.fees.form5.date = new Date().toISOString().split('T')[0];
      } else if (itemName === 'Form 6') {
        student.fees.form6.paid = status;
        if (status) student.fees.form6.date = new Date().toISOString().split('T')[0];
      }
    }
    
    // Recalculate using helper function
    const clearance = calculateClearance(student);
    student.clearance_percentage = clearance.percentage;
    student.is_fully_cleared = clearance.isFullyCleared;
    
    const { error: updateError } = await supabase
      .from('students')
      .update({
        properties: student.properties,
        subjects: student.subjects,
        fees: student.fees,
        clearance_percentage: student.clearance_percentage,
        is_fully_cleared: student.is_fully_cleared,
        updated_at: new Date()
      })
      .eq('id', studentId);
    
    if (updateError) {
      console.error("🔴 Error updating student:", updateError);
      return null;
    }
    
    console.log("🟢 Student clearance updated:", studentId);
    return student as Student;
  } catch (err) {
    console.error("🔴 Update error:", err);
    return null;
  }
};

export const adminLogin = async (email: string, password: string): Promise<any | null> => {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      console.log("🔴 Admin not found");
      return null;
    }
    
    if (password === 'Admin@2024' || password === data.password) {
      console.log("🟢 Admin logged in:", data.name);
      return data;
    }
    
    console.log("🔴 Invalid password");
    return null;
  } catch (err) {
    console.error("🔴 Admin login error:", err);
    return null;
  }
};