// ============================================
// COMPLETE STUDENT DATABASE - ALL 31 STUDENTS
// MWENGE SECONDARY SCHOOL
// ============================================

export interface Student {
  id: string;
  examNumber: string;
  fullName: string;
  firstName: string;
  lastName: string;
  combination: string;
  hasPassword: boolean;
  clearancePercentage: number;
  isFullyCleared: boolean;
  properties: {
    softBroom: { name: string; status: boolean };
    softBrush: { name: string; status: boolean };
    hoe: { name: string; status: boolean };
    slasher: { name: string; status: boolean };
    bucket: { name: string; status: boolean };
    plate: { name: string; status: boolean };
    cup: { name: string; status: boolean };
    spoon: { name: string; status: boolean };
    bedSheet: { name: string; status: boolean };
    mattress: { name: string; status: boolean };
    rimPapers: { name: string; status: boolean };
    schoolFees: { name: string; status: boolean };
    seriesContributions: { name: string; status: boolean };
    uniforms: { name: string; status: boolean };
  };
  subjects: Array<{ 
    letter: string; 
    name: string; 
    tuition: boolean; 
    series: boolean; 
    total: number 
  }>;
  fees: {
    form5: { amount: number; paid: boolean; date?: string };
    form6: { amount: number; paid: boolean; date?: string };
  };
  comments: Array<{ author: string; text: string; date: string }>;
}

// ============================================
// COMPLETE STUDENT DATABASE - ALL 31 STUDENTS
// ============================================
export const students: Student[] = [
  // ========== STUDENT 1 ========== S0334-0971 - ABBUBBAKAR AMIN ADAM
  {
    id: "1",
    examNumber: "S0334-0971",
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
      { letter: "A", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Mathematics", tuition: false, series: false, total: 55000 },
      { letter: "C", name: "Computer Science", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-15" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 2 ========== S0334-0972 - BARAKA MSEI THADEI
  {
    id: "2",
    examNumber: "S0334-0972",
    fullName: "BARAKA MSEI THADEI",
    firstName: "BARAKA",
    lastName: "THADEI",
    combination: "PMC",
    hasPassword: false,
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
      { letter: "E", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "F", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "G", name: "Computer Science", tuition: false, series: false, total: 55000 },
      { letter: "H", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-20" },
      form6: { amount: 95000, paid: true, date: "2024-08-10" }
    },
    comments: []
  },
  // ========== STUDENT 3 ========== S0334-0973 - DANIEL MARTIN KASIGU
  {
    id: "3",
    examNumber: "S0334-0973",
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
      { letter: "I", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "J", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "K", name: "Computer Science", tuition: true, series: true, total: 55000 },
      { letter: "L", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-05" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 4 ========== S0334-0974 - EDWIN SAMWEL PASCAL
  {
    id: "4",
    examNumber: "S0334-0974",
    fullName: "EDWIN SAMWEL PASCAL",
    firstName: "EDWIN",
    lastName: "PASCAL",
    combination: "PMC",
    hasPassword: false,
    clearancePercentage: 60,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "M", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "N", name: "Mathematics", tuition: false, series: false, total: 55000 },
      { letter: "O", name: "Computer Science", tuition: true, series: true, total: 55000 },
      { letter: "P", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: false },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 5 ========== S0334-0975 - ELISHA BOAZ MAGEMBE
  {
    id: "5",
    examNumber: "S0334-0975",
    fullName: "ELISHA BOAZ MAGEMBE",
    firstName: "ELISHA",
    lastName: "MAGEMBE",
    combination: "PCM",
    hasPassword: false,
    clearancePercentage: 100,
    isFullyCleared: true,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "Q", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "R", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "S", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "T", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-10" },
      form6: { amount: 95000, paid: true, date: "2024-07-15" }
    },
    comments: []
  },
  // ========== STUDENT 6 ========== S0334-0976 - EMANUEL STIVIN MBEGU
  {
    id: "6",
    examNumber: "S0334-0976",
    fullName: "EMANUEL STIVIN MBEGU",
    firstName: "EMANUEL",
    lastName: "MBEGU",
    combination: "PCM",
    hasPassword: false,
    clearancePercentage: 55,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "U", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "V", name: "Chemistry", tuition: false, series: false, total: 55000 },
      { letter: "W", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "X", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-18" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 7 ========== S0334-0977 - EMMANUEL JOEL DAUDI
  {
    id: "7",
    examNumber: "S0334-0977",
    fullName: "EMMANUEL JOEL DAUDI",
    firstName: "EMMANUEL",
    lastName: "DAUDI",
    combination: "PCM",
    hasPassword: false,
    clearancePercentage: 95,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "Y", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "Z", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "A", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-25" },
      form6: { amount: 95000, paid: true, date: "2024-08-20" }
    },
    comments: []
  },
  // ========== STUDENT 8 ========== S0334-0978 - EMMANUEL MUSA MAYEGA
  {
    id: "8",
    examNumber: "S0334-0978",
    fullName: "EMMANUEL MUSA MAYEGA",
    firstName: "EMMANUEL",
    lastName: "MAYEGA",
    combination: "PCM",
    hasPassword: false,
    clearancePercentage: 75,
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
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "C", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "E", name: "Mathematics", tuition: false, series: false, total: 55000 },
      { letter: "F", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-01" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 9 ========== S0334-0979 - ERRIC CHACHA MAGANDA
  {
    id: "9",
    examNumber: "S0334-0979",
    fullName: "ERRIC CHACHA MAGANDA",
    firstName: "ERRIC",
    lastName: "MAGANDA",
    combination: "HKL",
    hasPassword: false,
    clearancePercentage: 60,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "G", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "H", name: "Kiswahili", tuition: true, series: true, total: 55000 },
      { letter: "I", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "J", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-30" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 10 ========== S0334-0980 - FINEHASI ELIEZARI RAMADHANI
  {
    id: "10",
    examNumber: "S0334-0980",
    fullName: "FINEHASI ELIEZARI RAMADHANI",
    firstName: "FINEHASI",
    lastName: "RAMADHANI",
    combination: "HKL",
    hasPassword: false,
    clearancePercentage: 95,
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
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "K", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "L", name: "Kiswahili", tuition: true, series: true, total: 55000 },
      { letter: "M", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "N", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-10" },
      form6: { amount: 95000, paid: true, date: "2024-07-28" }
    },
    comments: []
  },
  // ========== STUDENT 11 ========== S0334-0981 - GEORGE ALOYCE MABULA
  {
    id: "11",
    examNumber: "S0334-0981",
    fullName: "GEORGE ALOYCE MABULA",
    firstName: "GEORGE",
    lastName: "MABULA",
    combination: "HKL",
    hasPassword: false,
    clearancePercentage: 70,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "O", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "P", name: "Kiswahili", tuition: false, series: false, total: 55000 },
      { letter: "Q", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "R", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-12" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 12 ========== S0334-0982 - GODBLESS PETER NYEURA
  {
    id: "12",
    examNumber: "S0334-0982",
    fullName: "GODBLESS PETER NYEURA",
    firstName: "GODBLESS",
    lastName: "NYEURA",
    combination: "HGK",
    hasPassword: false,
    clearancePercentage: 65,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: false },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "S", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "T", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "U", name: "Kiswahili", tuition: false, series: false, total: 55000 },
      { letter: "V", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-22" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 13 ========== S0334-0983 - IZRAEL PHILIMON IZRAEL
  {
    id: "13",
    examNumber: "S0334-0983",
    fullName: "IZRAEL PHILIMON IZRAEL",
    firstName: "IZRAEL",
    lastName: "IZRAEL",
    combination: "HGK",
    hasPassword: false,
    clearancePercentage: 85,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "W", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "X", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "Y", name: "Kiswahili", tuition: true, series: true, total: 55000 },
      { letter: "Z", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-05" },
      form6: { amount: 95000, paid: true, date: "2024-08-01" }
    },
    comments: []
  },
  // ========== STUDENT 14 ========== S0334-0984 - JOVIN MASOLOGO MAJUTO
  {
    id: "14",
    examNumber: "S0334-0984",
    fullName: "JOVIN MASOLOGO MAJUTO",
    firstName: "JOVIN",
    lastName: "MAJUTO",
    combination: "HGK",
    hasPassword: false,
    clearancePercentage: 100,
    isFullyCleared: true,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "A", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "C", name: "Kiswahili", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-14" },
      form6: { amount: 95000, paid: true, date: "2024-07-20" }
    },
    comments: []
  },
  // ========== STUDENT 15 ========== S0334-0985 - KELVIN DANIEL MSUYA
  {
    id: "15",
    examNumber: "S0334-0985",
    fullName: "KELVIN DANIEL MSUYA",
    firstName: "KELVIN",
    lastName: "MSUYA",
    combination: "PCB",
    hasPassword: false,
    clearancePercentage: 70,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "E", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "F", name: "Chemistry", tuition: false, series: false, total: 55000 },
      { letter: "G", name: "Biology", tuition: true, series: true, total: 55000 },
      { letter: "H", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-18" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 16 ========== S0334-0986 - KULWA DIONIZ LUKANYA
  {
    id: "16",
    examNumber: "S0334-0986",
    fullName: "KULWA DIONIZ LUKANYA",
    firstName: "KULWA",
    lastName: "LUKANYA",
    combination: "PCB",
    hasPassword: false,
    clearancePercentage: 75,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "I", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "J", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "K", name: "Biology", tuition: true, series: true, total: 55000 },
      { letter: "L", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-08" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 17 ========== S0334-0987 - MAYANGA JOSEPH MAYANGA
  {
    id: "17",
    examNumber: "S0334-0987",
    fullName: "MAYANGA JOSEPH MAYANGA",
    firstName: "MAYANGA",
    lastName: "MAYANGA",
    combination: "PCB",
    hasPassword: false,
    clearancePercentage: 90,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "M", name: "Physics", tuition: true, series: true, total: 55000 },
      { letter: "N", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "O", name: "Biology", tuition: false, series: false, total: 55000 },
      { letter: "P", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-22" },
      form6: { amount: 95000, paid: true, date: "2024-08-05" }
    },
    comments: []
  },
  // ========== STUDENT 18 ========== S0334-0988 - MENG'ORIKI SAIGILU MOLLEL
  {
    id: "18",
    examNumber: "S0334-0988",
    fullName: "MENG'ORIKI SAIGILU MOLLEL",
    firstName: "MENG'ORIKI",
    lastName: "MOLLEL",
    combination: "EGM",
    hasPassword: false,
    clearancePercentage: 95,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: false },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "Q", name: "Economics", tuition: true, series: true, total: 55000 },
      { letter: "R", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "S", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "T", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-25" },
      form6: { amount: 95000, paid: true, date: "2024-07-30" }
    },
    comments: []
  },
  // ========== STUDENT 19 ========== S0334-0989 - MUSSA HAMIS JAMES
  {
    id: "19",
    examNumber: "S0334-0989",
    fullName: "MUSSA HAMIS JAMES",
    firstName: "MUSSA",
    lastName: "JAMES",
    combination: "EGM",
    hasPassword: false,
    clearancePercentage: 60,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "U", name: "Economics", tuition: true, series: true, total: 55000 },
      { letter: "V", name: "Geography", tuition: false, series: false, total: 55000 },
      { letter: "W", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "X", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-28" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 20 ========== S0334-0990 - MWITA IBRAHIM SAMSON
  {
    id: "20",
    examNumber: "S0334-0990",
    fullName: "MWITA IBRAHIM SAMSON",
    firstName: "MWITA",
    lastName: "SAMSON",
    combination: "EGM",
    hasPassword: false,
    clearancePercentage: 100,
    isFullyCleared: true,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "Y", name: "Economics", tuition: true, series: true, total: 55000 },
      { letter: "Z", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "A", name: "Mathematics", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-03" },
      form6: { amount: 95000, paid: true, date: "2024-08-12" }
    },
    comments: []
  },
  // ========== STUDENT 21 ========== S0334-0991 - PETER MICHAEL MGANDILA
  {
    id: "21",
    examNumber: "S0334-0991",
    fullName: "PETER MICHAEL MGANDILA",
    firstName: "PETER",
    lastName: "MGANDILA",
    combination: "HGE",
    hasPassword: false,
    clearancePercentage: 70,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "C", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "E", name: "Economics", tuition: false, series: false, total: 55000 },
      { letter: "F", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-08" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 22 ========== S0334-0992 - PETRO LUSANIKA LUBINZA
  {
    id: "22",
    examNumber: "S0334-0992",
    fullName: "PETRO LUSANIKA LUBINZA",
    firstName: "PETRO",
    lastName: "LUBINZA",
    combination: "HGE",
    hasPassword: false,
    clearancePercentage: 65,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: false },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "G", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "H", name: "Geography", tuition: false, series: false, total: 55000 },
      { letter: "I", name: "Economics", tuition: true, series: true, total: 55000 },
      { letter: "J", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-17" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 23 ========== S0334-0993 - RAMADHAN MSTAPHA JUMANNE
  {
    id: "23",
    examNumber: "S0334-0993",
    fullName: "RAMADHAN MSTAPHA JUMANNE",
    firstName: "RAMADHAN",
    lastName: "JUMANNE",
    combination: "HGE",
    hasPassword: false,
    clearancePercentage: 90,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "K", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "L", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "M", name: "Economics", tuition: true, series: true, total: 55000 },
      { letter: "N", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-14" },
      form6: { amount: 95000, paid: true, date: "2024-08-08" }
    },
    comments: []
  },
  // ========== STUDENT 24 ========== S0334-0994 - REUBEN SAMWEL MISANA
  {
    id: "24",
    examNumber: "S0334-0994",
    fullName: "REUBEN SAMWEL MISANA",
    firstName: "REUBEN",
    lastName: "MISANA",
    combination: "CBG",
    hasPassword: false,
    clearancePercentage: 100,
    isFullyCleared: true,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "O", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "P", name: "Biology", tuition: true, series: true, total: 55000 },
      { letter: "Q", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "R", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-20" },
      form6: { amount: 95000, paid: true, date: "2024-07-25" }
    },
    comments: []
  },
  // ========== STUDENT 25 ========== S0334-0995 - SAMSON MAHUSHI BUZINZA
  {
    id: "25",
    examNumber: "S0334-0995",
    fullName: "SAMSON MAHUSHI BUZINZA",
    firstName: "SAMSON",
    lastName: "BUZINZA",
    combination: "CBG",
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
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "S", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "T", name: "Biology", tuition: false, series: false, total: 55000 },
      { letter: "U", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "V", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-27" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 26 ========== S0334-0996 - SHABAN MOHAMMED ABBAKAR
  {
    id: "26",
    examNumber: "S0334-0996",
    fullName: "SHABAN MOHAMMED ABBAKAR",
    firstName: "SHABAN",
    lastName: "ABBAKAR",
    combination: "CBG",
    hasPassword: false,
    clearancePercentage: 90,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: false },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: false },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: false },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "W", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "X", name: "Biology", tuition: true, series: true, total: 55000 },
      { letter: "Y", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "Z", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-05" },
      form6: { amount: 95000, paid: true, date: "2024-08-15" }
    },
    comments: []
  },
  // ========== STUDENT 27 ========== S0334-0997 - SITTA BADO MAZUNGU
  {
    id: "27",
    examNumber: "S0334-0997",
    fullName: "SITTA BADO MAZUNGU",
    firstName: "SITTA",
    lastName: "MAZUNGU",
    combination: "CBG",
    hasPassword: false,
    clearancePercentage: 75,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "A", name: "Chemistry", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Biology", tuition: true, series: true, total: 55000 },
      { letter: "C", name: "Geography", tuition: false, series: false, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-11" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 28 ========== S0334-0998 - THADEUS JOSEPH MALKIADI
  {
    id: "28",
    examNumber: "S0334-0998",
    fullName: "THADEUS JOSEPH MALKIADI",
    firstName: "THADEUS",
    lastName: "MALKIADI",
    combination: "HGL",
    hasPassword: false,
    clearancePercentage: 95,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: false },
      plate: { name: "Plate", status: true },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "A", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "C", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-12" },
      form6: { amount: 95000, paid: true, date: "2024-07-18" }
    },
    comments: []
  },
  // ========== STUDENT 29 ========== S0334-0999 - WASTARA SAID HESSEN
  {
    id: "29",
    examNumber: "S0334-0999",
    fullName: "WASTARA SAID HESSEN",
    firstName: "WASTARA",
    lastName: "HESSEN",
    combination: "HGL",
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
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "A", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Geography", tuition: false, series: false, total: 55000 },
      { letter: "C", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-01-19" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 30 ========== S0334-1000 - ZUBERI HAJI ZUBERI
  {
    id: "30",
    examNumber: "S0334-1000",
    fullName: "ZUBERI HAJI ZUBERI",
    firstName: "ZUBERI",
    lastName: "ZUBERI",
    combination: "HGL",
    hasPassword: false,
    clearancePercentage: 75,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: true },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: true },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: true },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: true },
      rimPapers: { name: "Rim Papers", status: false },
      schoolFees: { name: "School Fees", status: true },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: true }
    },
    subjects: [
      { letter: "A", name: "History", tuition: true, series: true, total: 55000 },
      { letter: "B", name: "Geography", tuition: true, series: true, total: 55000 },
      { letter: "C", name: "Language", tuition: true, series: true, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: false, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: true, date: "2024-02-28" },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  },
  // ========== STUDENT 31 ========== S0334-1001 - YEHU DANIEL SINDILA (CBG)
  {
    id: "31",
    examNumber: "S0334-1001",
    fullName: "YEHU DANIEL SINDILA",
    firstName: "YEHU",
    lastName: "SINDILA",
    combination: "CBG",
    hasPassword: false,
    clearancePercentage: 45,
    isFullyCleared: false,
    properties: {
      softBroom: { name: "Soft Broom", status: true },
      softBrush: { name: "Soft Brush", status: false },
      hoe: { name: "Hoe", status: true },
      slasher: { name: "Slasher", status: false },
      bucket: { name: "Bucket", status: true },
      plate: { name: "Plate", status: false },
      cup: { name: "Cup", status: true },
      spoon: { name: "Spoon", status: false },
      bedSheet: { name: "Bed Sheet", status: true },
      mattress: { name: "Mattress", status: false },
      rimPapers: { name: "Rim Papers", status: true },
      schoolFees: { name: "School Fees", status: false },
      seriesContributions: { name: "Series Contributions", status: true },
      uniforms: { name: "Uniforms", status: false }
    },
    subjects: [
      { letter: "A", name: "Chemistry", tuition: true, series: false, total: 55000 },
      { letter: "B", name: "Biology", tuition: false, series: true, total: 55000 },
      { letter: "C", name: "Geography", tuition: false, series: false, total: 55000 },
      { letter: "D", name: "General Studies", tuition: false, series: true, total: 25000 }
    ],
    fees: {
      form5: { amount: 80000, paid: false },
      form6: { amount: 95000, paid: false }
    },
    comments: []
  }
];

// ============================================
// PASSWORD STORAGE (Using localStorage for persistence)
// ============================================

const PASSWORD_STORAGE_KEY = 'student_passwords';

// Initialize password storage
const getPasswordStore = (): Record<string, string> => {
  const stored = localStorage.getItem(PASSWORD_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const savePasswordStore = (store: Record<string, string>) => {
  localStorage.setItem(PASSWORD_STORAGE_KEY, JSON.stringify(store));
};

// Authenticate student by exam number and last name
export const authenticateStudent = (examNumber: string, lastName: string): Student | null => {
  const student = students.find(s => 
    s.examNumber === examNumber && 
    s.lastName.toLowerCase() === lastName.toLowerCase()
  );
  console.log("Authenticating:", examNumber, lastName, "Found:", student);
  return student || null;
};

// Get student by ID - MAKE SURE IT RETURNS COMMENTS
export const getStudentById = (id: string): Student | undefined => {
  const student = students.find(s => s.id === id);
  console.log("🟡 STUDENT DASHBOARD: Getting student by ID:", id);
  console.log("🟡 Found student:", student?.fullName);
  console.log("🟡 Comments:", student?.comments);
  return student;
};// Save password for student
export const savePassword = (studentId: string, password: string): void => {
  console.log("Saving password for student:", studentId);
  const store = getPasswordStore();
  store[studentId] = password;
  savePasswordStore(store);
  
  // Update student in memory
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.hasPassword = true;
    console.log("Password saved, student updated:", student);
  }
};

// Verify password
export const verifyPassword = (studentId: string, password: string): boolean => {
  const store = getPasswordStore();
  return store[studentId] === password;
};

// Check if student has password
export const hasPassword = (studentId: string): boolean => {
  const store = getPasswordStore();
  return !!store[studentId];
};

// Get all students (for admin)
export const getAllStudents = (): Student[] => {
  console.log("Getting all students, count:", students.length);
  return [...students];
};

// Get students by combination
export const getStudentsByCombination = (combination: string): Student[] => {
  return students.filter(s => s.combination === combination);
};

// Update student clearance (admin function)
export const updateStudentClearance = (
  studentId: string, 
  itemType: 'property' | 'subject' | 'fee',
  itemName: string,
  status: boolean
): Student | null => {
  console.log("Updating clearance:", studentId, itemType, itemName, status);
  
  const studentIndex = students.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return null;
  
  const student = students[studentIndex];
  
  if (itemType === 'property') {
    const propKey = Object.keys(student.properties).find(
      key => student.properties[key as keyof typeof student.properties].name === itemName
    );
    if (propKey) {
      (student.properties[propKey as keyof typeof student.properties] as any).status = status;
    }
  } else if (itemType === 'subject') {
    const subject = student.subjects.find(s => s.name === itemName);
    if (subject) {
      subject.tuition = status;
      subject.series = status;
    }
  } else if (itemType === 'fee') {
    if (itemName === 'Form 5') {
      student.fees.form5.paid = status;
      if (status) student.fees.form5.date = new Date().toLocaleDateString('en-CA');
    } else if (itemName === 'Form 6') {
      student.fees.form6.paid = status;
      if (status) student.fees.form6.date = new Date().toLocaleDateString('en-CA');
    }
  }
  
  // Recalculate clearance percentage
  let cleared = 0;
  Object.values(student.properties).forEach(prop => { if (prop.status) cleared++; });
  student.subjects.forEach(sub => { if (sub.tuition && sub.series) cleared++; });
  if (student.fees.form5.paid) cleared++;
  if (student.fees.form6.paid) cleared++;
  
  student.clearancePercentage = Math.round((cleared / 20) * 100);
  student.isFullyCleared = cleared === 20;
  
  console.log("Student updated:", student);
  return student;
};

// Add comment to student - FORCE UPDATE VERSION
export const addComment = (
  studentId: string,
  comment: { author: string; text: string }
): Student | null => {
  console.log("🔵 ADMIN: Adding comment for student:", studentId, comment);
  
  const studentIndex = students.findIndex(s => s.id === studentId);
  if (studentIndex === -1) {
    console.error("🔴 ERROR: Student not found:", studentId);
    return null;
  }
  
  // Initialize comments array if it doesn't exist
  if (!students[studentIndex].comments) {
    students[studentIndex].comments = [];
  }
  
  // Create new comment with proper date
  const newComment = {
    author: comment.author,
    text: comment.text,
    date: new Date().toLocaleDateString('en-CA')
  };
  
  // Add to comments array
  students[studentIndex].comments.push(newComment);
  
  console.log("🟢 SUCCESS: Comment added. Student now has", students[studentIndex].comments.length, "comments");
  console.log("📝 Comments:", students[studentIndex].comments);
  
  // Return the updated student
  return students[studentIndex];
};