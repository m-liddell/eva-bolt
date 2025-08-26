interface Objective {
  id: string;
  code: string;
  description: string;
}

interface CurriculumObjectives {
  [subject: string]: {
    [category: string]: Objective[];
  };
}

export const curriculumObjectives: CurriculumObjectives = {
  "English": {
    "Reading": [
      {
        id: "1",
        code: "EN1",
        description: "Read fluently, understanding and responding to a wide range of texts"
      },
      {
        id: "2",
        code: "EN2",
        description: "Develop critical understanding of increasingly complex texts"
      },
      {
        id: "3",
        code: "EN3",
        description: "Learn new vocabulary, relating it explicitly to known vocabulary and understanding it with the help of context and dictionaries"
      },
      {
        id: "4",
        code: "EN4",
        description: "Make inferences and refer to evidence in the text"
      }
    ],
    "Writing": [
      {
        id: "5",
        code: "EN5",
        description: "Write accurately, fluently and effectively for different purposes and audiences"
      },
      {
        id: "6",
        code: "EN6",
        description: "Use Standard English confidently in their writing"
      },
      {
        id: "7",
        code: "EN7",
        description: "Plan, draft, edit and proof-read through paying attention to accurate grammar, vocabulary and text structure"
      },
      {
        id: "8",
        code: "EN8",
        description: "Amend the vocabulary, grammar and structure of their writing to improve its coherence and overall effectiveness"
      }
    ],
    "Speaking & Listening": [
      {
        id: "9",
        code: "EN9",
        description: "Speak confidently and effectively in different contexts"
      },
      {
        id: "10",
        code: "EN10",
        description: "Use Standard English confidently in a range of formal and informal contexts"
      },
      {
        id: "11",
        code: "EN11",
        description: "Give short speeches and presentations, expressing their own ideas and keeping to the point"
      }
    ]
  },
  "Mathematics": {
    "Number": [
      {
        id: "12",
        code: "MA1",
        description: "Understand and use place value for decimals, measures and integers of any size"
      },
      {
        id: "13",
        code: "MA2",
        description: "Use the four operations, including formal written methods, applied to integers, decimals, proper and improper fractions, and mixed numbers"
      },
      {
        id: "14",
        code: "MA3",
        description: "Use standard units of mass, length, time, money and other measures"
      }
    ],
    "Algebra": [
      {
        id: "15",
        code: "MA4",
        description: "Use algebraic methods to solve linear equations in one variable"
      },
      {
        id: "16",
        code: "MA5",
        description: "Use and interpret algebraic notation, including coefficients written as fractions"
      },
      {
        id: "17",
        code: "MA6",
        description: "Understand and use the concepts and vocabulary of expressions, equations, inequalities, terms and factors"
      }
    ],
    "Geometry": [
      {
        id: "18",
        code: "MA7",
        description: "Derive and apply formulae to calculate and solve problems involving perimeter and area of triangles, parallelograms, trapezia, volume of cuboids"
      },
      {
        id: "19",
        code: "MA8",
        description: "Know and apply the properties of angles at a point, angles at a point on a straight line, vertically opposite angles"
      }
    ]
  },
  "Science": {
    "Biology": [
      {
        id: "20",
        code: "SC1",
        description: "Cells and organisation"
      },
      {
        id: "21",
        code: "SC2",
        description: "The skeletal and muscular systems"
      },
      {
        id: "22",
        code: "SC3",
        description: "Nutrition and digestion"
      },
      {
        id: "23",
        code: "SC4",
        description: "Gas exchange systems"
      },
      {
        id: "24",
        code: "SC5",
        description: "Reproduction"
      },
      {
        id: "25",
        code: "SC6",
        description: "Health"
      }
    ],
    "Chemistry": [
      {
        id: "26",
        code: "SC7",
        description: "Particles and their behaviour"
      },
      {
        id: "27",
        code: "SC8",
        description: "Elements, atoms and compounds"
      },
      {
        id: "28",
        code: "SC9",
        description: "Pure and impure substances"
      }
    ],
    "Physics": [
      {
        id: "29",
        code: "SC9",
        description: "Energy changes and transfers"
      },
      {
        id: "30",
        code: "SC10",
        description: "Motion and forces"
      },
      {
        id: "31",
        code: "SC11",
        description: "Sound"
      },
      {
        id: "32",
        code: "SC12",
        description: "Light"
      },
      {
        id: "33",
        code: "SC13",
        description: "Space physics"
      }
    ],
    "Working Scientifically": [
      {
        id: "34",
        code: "SC14",
        description: "Experimental skills and investigations"
      },
      {
        id: "35",
        code: "SC15",
        description: "Analysis and evaluation"
      },
      {
        id: "36",
        code: "SC16",
        description: "Measurement"
      }
    ]
  },
  "History": {
    "Medieval History": [
      {
        id: "37",
        code: "HI1",
        description: "The development of Church, state and society in Medieval Britain 1066-1509"
      },
      {
        id: "38",
        code: "HI2",
        description: "The development of Church, state and society in Britain 1509-1745"
      }
    ],
    "Modern History": [
      {
        id: "39",
        code: "HI3",
        description: "Ideas, political power, industry and empire: Britain, 1745-1901"
      },
      {
        id: "40",
        code: "HI4",
        description: "Challenges for Britain, Europe and the wider world 1901 to the present day"
      }
    ],
    "Historical Skills": [
      {
        id: "41",
        code: "HI5",
        description: "Know and understand the history of these islands as a coherent, chronological narrative"
      },
      {
        id: "42",
        code: "HI6",
        description: "Understand historical concepts such as continuity and change, cause and consequence, similarity, difference and significance"
      },
      {
        id: "43",
        code: "HI7",
        description: "Understand the methods of historical enquiry, including how evidence is used rigorously to make historical claims"
      }
    ]
  }
};