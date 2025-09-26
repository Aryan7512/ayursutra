// Dosha Calculation and Assessment Logic

export interface AssessmentQuestion {
  id: string;
  category: 'physical' | 'physiological' | 'mental' | 'lifestyle' | 'health';
  question: string;
  options: {
    vata: { text: string; weight: number };
    pitta: { text: string; weight: number };
    kapha: { text: string; weight: number };
  };
}

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface DoshaResult {
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  constitution: string;
  recommendations: string[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Physical Characteristics
  {
    id: 'q1',
    category: 'physical',
    question: 'What best describes your body build?',
    options: {
      vata: { text: 'Thin, light frame, difficulty gaining weight', weight: 3 },
      pitta: { text: 'Medium build, muscular, moderate weight gain/loss', weight: 3 },
      kapha: { text: 'Large frame, heavy build, gains weight easily', weight: 3 }
    }
  },
  {
    id: 'q2',
    category: 'physical',
    question: 'How would you describe your skin?',
    options: {
      vata: { text: 'Dry, rough, cool to touch, prone to wrinkles', weight: 3 },
      pitta: { text: 'Warm, oily, prone to rashes and irritation', weight: 3 },
      kapha: { text: 'Moist, smooth, cool, thick, prone to congestion', weight: 3 }
    }
  },
  {
    id: 'q3',
    category: 'physical',
    question: 'What is your hair type?',
    options: {
      vata: { text: 'Dry, brittle, frizzy, thin', weight: 2 },
      pitta: { text: 'Fine, oily, early graying or balding, reddish tint', weight: 2 },
      kapha: { text: 'Thick, lustrous, oily, wavy, strong', weight: 2 }
    }
  },

  // Physiological Patterns
  {
    id: 'q4',
    category: 'physiological',
    question: 'How is your appetite?',
    options: {
      vata: { text: 'Irregular, sometimes forget to eat, variable portions', weight: 3 },
      pitta: { text: 'Strong, regular, get irritable when hungry', weight: 3 },
      kapha: { text: 'Steady but mild, can skip meals easily', weight: 3 }
    }
  },
  {
    id: 'q5',
    category: 'physiological',
    question: 'How is your digestion?',
    options: {
      vata: { text: 'Irregular, prone to gas, bloating, constipation', weight: 3 },
      pitta: { text: 'Strong, prone to acidity, loose stools when upset', weight: 3 },
      kapha: { text: 'Slow, heavy feeling after meals, mucus formation', weight: 3 }
    }
  },
  {
    id: 'q6',
    category: 'physiological',
    question: 'What are your sleep patterns?',
    options: {
      vata: { text: 'Light sleeper, restless, hard to fall asleep', weight: 3 },
      pitta: { text: 'Moderate sleep, wake up refreshed, vivid dreams', weight: 3 },
      kapha: { text: 'Deep, long sleep, hard to wake up, feel groggy', weight: 3 }
    }
  },

  // Mental & Emotional Traits
  {
    id: 'q7',
    category: 'mental',
    question: 'How do you handle stress?',
    options: {
      vata: { text: 'Anxious, worried, scattered thoughts', weight: 3 },
      pitta: { text: 'Irritable, impatient, angry outbursts', weight: 3 },
      kapha: { text: 'Withdrawn, stubborn, difficulty with change', weight: 3 }
    }
  },
  {
    id: 'q8',
    category: 'mental',
    question: 'How is your memory?',
    options: {
      vata: { text: 'Quick to learn, quick to forget, scattered', weight: 2 },
      pitta: { text: 'Sharp, precise, good at details', weight: 2 },
      kapha: { text: 'Slow to learn but excellent long-term retention', weight: 2 }
    }
  },
  {
    id: 'q9',
    category: 'mental',
    question: 'How do you make decisions?',
    options: {
      vata: { text: 'Quickly but change mind often, indecisive', weight: 2 },
      pitta: { text: 'Decisively, logically, goal-oriented', weight: 2 },
      kapha: { text: 'Slowly after careful consideration, stick to decisions', weight: 2 }
    }
  },

  // Lifestyle Preferences
  {
    id: 'q10',
    category: 'lifestyle',
    question: 'What climate do you prefer?',
    options: {
      vata: { text: 'Warm, humid, dislike cold and wind', weight: 2 },
      pitta: { text: 'Cool, dry, dislike heat and humidity', weight: 2 },
      kapha: { text: 'Warm, dry, dislike cold and damp', weight: 2 }
    }
  },
  {
    id: 'q11',
    category: 'lifestyle',
    question: 'What type of exercise do you prefer?',
    options: {
      vata: { text: 'Gentle, varied, yoga, walking, dancing', weight: 2 },
      pitta: { text: 'Moderate intensity, competitive sports, swimming', weight: 2 },
      kapha: { text: 'Vigorous, regular routine, weight training, running', weight: 2 }
    }
  },

  // Current Health Status
  {
    id: 'q12',
    category: 'health',
    question: 'What health issues do you commonly experience?',
    options: {
      vata: { text: 'Anxiety, insomnia, joint pain, digestive irregularity', weight: 3 },
      pitta: { text: 'Acidity, skin problems, anger issues, inflammation', weight: 3 },
      kapha: { text: 'Weight gain, congestion, lethargy, depression', weight: 3 }
    }
  }
];

export function calculateDosha(responses: Record<string, 'vata' | 'pitta' | 'kapha'>): DoshaResult {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };

  // Calculate weighted scores
  ASSESSMENT_QUESTIONS.forEach(question => {
    const response = responses[question.id];
    if (response) {
      const weight = question.options[response].weight;
      scores[response] += weight;
    }
  });

  // Calculate total and percentages
  const total = scores.vata + scores.pitta + scores.kapha;
  const vataPercentage = Math.round((scores.vata / total) * 100);
  const pittaPercentage = Math.round((scores.pitta / total) * 100);
  const kaphaPercentage = Math.round((scores.kapha / total) * 100);

  // Determine dominant dosha
  const dominantDosha = scores.vata >= scores.pitta && scores.vata >= scores.kapha ? 'vata' :
                      scores.pitta >= scores.kapha ? 'pitta' : 'kapha';

  // Generate constitution description
  const constitution = getConstitutionDescription(vataPercentage, pittaPercentage, kaphaPercentage);

  // Generate personalized recommendations
  const recommendations = getPersonalizedRecommendations(dominantDosha);

  return {
    vataPercentage,
    pittaPercentage,
    kaphaPercentage,
    dominantDosha,
    constitution,
    recommendations
  };
}

function getConstitutionDescription(vata: number, pitta: number, kapha: number): string {
  const dominant = vata >= pitta && vata >= kapha ? 'Vata' :
                   pitta >= kapha ? 'Pitta' : 'Kapha';

  const secondary = vata >= pitta && vata >= kapha ?
                    (pitta >= kapha ? 'Pitta' : 'Kapha') :
                    pitta >= kapha ?
                    (vata >= kapha ? 'Vata' : 'Kapha') :
                    (vata >= pitta ? 'Vata' : 'Pitta');

  // Check if it's a bi-doshic constitution (within 10% difference)
  const maxPercentage = Math.max(vata, pitta, kapha);
  const secondHighest = [vata, pitta, kapha].sort((a, b) => b - a)[1];

  if (maxPercentage - secondHighest <= 10) {
    return `${dominant}-${secondary} Constitution`;
  }

  return `${dominant} Constitution`;
}

function getPersonalizedRecommendations(dominantDosha: string): string[] {
  const recommendations: string[] = [];

  switch (dominantDosha) {
    case 'vata':
      recommendations.push(
        'Maintain regular daily routines and meal times',
        'Choose warm, cooked, and nourishing foods',
        'Practice gentle yoga and meditation to calm the nervous system',
        'Get adequate rest and avoid overstimulation',
        'Use warm oil massages (Abhyanga) regularly'
      );
      break;

    case 'pitta':
      recommendations.push(
        'Keep cool and avoid excessive heat and sun exposure',
        'Eat cooling foods and avoid spicy, fried foods',
        'Practice moderate exercise, preferably in cool environments',
        'Manage stress and avoid perfectionist tendencies',
        'Include cooling herbs like coriander and fennel in your diet'
      );
      break;

    case 'kapha':
      recommendations.push(
        'Engage in regular vigorous exercise to boost metabolism',
        'Choose light, warm, and spicy foods; avoid heavy, oily foods',
        'Wake up early and avoid excessive sleep',
        'Keep warm and dry; avoid cold, damp environments',
        'Practice energizing breathing exercises (Pranayama)'
      );
      break;
  }

  return recommendations;
}

export const DOSHA_DESCRIPTIONS = {
  vata: {
    name: 'Vata',
    element: 'Air + Space',
    characteristics: 'Movement, creativity, communication',
    physicalTraits: 'Light build, dry skin, cold hands/feet',
    mentalTraits: 'Quick thinking, creative, enthusiastic',
    balanceState: 'Energetic, creative, flexible',
    imbalanceState: 'Anxious, restless, scattered'
  },
  pitta: {
    name: 'Pitta',
    element: 'Fire + Water',
    characteristics: 'Transformation, intelligence, leadership',
    physicalTraits: 'Medium build, warm body, sharp features',
    mentalTraits: 'Focused, ambitious, organized',
    balanceState: 'Confident, intelligent, goal-oriented',
    imbalanceState: 'Irritable, impatient, critical'
  },
  kapha: {
    name: 'Kapha',
    element: 'Earth + Water',
    characteristics: 'Stability, strength, endurance',
    physicalTraits: 'Solid build, smooth skin, thick hair',
    mentalTraits: 'Calm, patient, loyal',
    balanceState: 'Stable, compassionate, grounded',
    imbalanceState: 'Lethargic, stubborn, possessive'
  }
};