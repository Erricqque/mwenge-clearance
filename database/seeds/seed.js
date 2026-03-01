const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../backend/.env' });

const Student = require('../backend/models/Student');
const Admin = require('../backend/models/Admin');

const students = [
  {
    examNumber: "S0334-0971",
    admissionNumber: "ADM2024001",
    fullName: "ABBUBBAKAR AMIN ADAM",
    firstName: "ABBUBBAKAR",
    lastName: "ADAM",
    combination: "PMC",
    hasPassword: false,
    clearancePercentage: 65,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { 
        letter: "A", 
        name: "Physics", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "B", 
        name: "Mathematics", 
        paid: false,
        tuitionPaid: false,
        seriesPaid: false,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "C", 
        name: "Computer Science", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "D", 
        name: "General Studies", 
        paid: true,
        tuitionPaid: false,
        seriesPaid: true,
        tuitionAmount: 0,
        seriesAmount: 25000
      }
    ],
    fees: {
      form5: { amount: 80000, paid: true, paidDate: new Date('2024-01-15') },
      form6: { amount: 95000, paid: false }
    }
  },
  {
    examNumber: "S0334-0972",
    admissionNumber: "ADM2024002",
    fullName: "BARAKA MSEI THADEI",
    firstName: "BARAKA",
    lastName: "THADEI",
    combination: "PMC",
    hasPassword: true,
    clearancePercentage: 85,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: false },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { 
        letter: "E", 
        name: "Physics", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "F", 
        name: "Mathematics", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "G", 
        name: "Computer Science", 
        paid: false,
        tuitionPaid: false,
        seriesPaid: false,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "H", 
        name: "General Studies", 
        paid: true,
        tuitionPaid: false,
        seriesPaid: true,
        tuitionAmount: 0,
        seriesAmount: 25000
      }
    ],
    fees: {
      form5: { amount: 80000, paid: true, paidDate: new Date('2024-01-20') },
      form6: { amount: 95000, paid: true, paidDate: new Date('2024-08-10') }
    }
  },
  {
    examNumber: "S0334-0973",
    admissionNumber: "ADM2024003",
    fullName: "DANIEL MARTIN KASIGU",
    firstName: "DANIEL",
    lastName: "KASIGU",
    combination: "PMC",
    hasPassword: false,
    clearancePercentage: 70,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { 
        letter: "I", 
        name: "Physics", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "J", 
        name: "Mathematics", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "K", 
        name: "Computer Science", 
        paid: true,
        tuitionPaid: true,
        seriesPaid: true,
        tuitionAmount: 30000,
        seriesAmount: 25000
      },
      { 
        letter: "L", 
        name: "General Studies", 
        paid: false,
        tuitionPaid: false,
        seriesPaid: false,
        tuitionAmount: 0,
        seriesAmount: 25000
      }
    ],
    fees: {
      form5: { amount: 80000, paid: true, paidDate: new Date('2024-02-05') },
      form6: { amount: 95000, paid: false }
    }
  }
  // Continue for all 30 students...
];

const admins = [
  {
    name: 'Super Admin',
    email: 'admin@mwenge.edu',
    password: 'Admin@2024',
    role: 'super_admin',
    permissions: [
      'view_students', 'edit_students', 'delete_students',
      'process_payments', 'add_comments', 'manage_admins'
    ]
  },
  {
    name: 'Accounts Officer',
    email: 'accounts@mwenge.edu',
    password: 'Accounts@2024',
    role: 'accounts',
    permissions: ['view_students', 'process_payments', 'add_comments']
  },
  {
    name: 'Teacher',
    email: 'teacher@mwenge.edu',
    password: 'Teacher@2024',
    role: 'teacher',
    permissions: ['view_students', 'add_comments']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📊 Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert students
    for (const student of students) {
      await Student.create(student);
    }
    console.log(`✅ Inserted ${students.length} students`);

    // Insert admins
    for (const admin of admins) {
      await Admin.create(admin);
    }
    console.log(`✅ Inserted ${admins.length} admins`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();