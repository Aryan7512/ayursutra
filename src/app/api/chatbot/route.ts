import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

// Hardcoded responses for common queries
const defaultResponses = {
  // Anxiety and Nervousness
  'nervous': `For nervousness and anxiety, Ayurveda suggests several approaches:

🌿 Immediate Relief:
- Practice Pranayama (deep breathing): Inhale for 4 counts, hold for 4, exhale for 6
- Apply cooling essential oils like sandalwood or rose on temples
- Drink warm herbal tea with chamomile or brahmi

🧘‍♀️ Daily Practices:
- Regular meditation (even 10 minutes daily)
- Abhyanga (self-massage) with sesame oil before bath
- Follow a Vata-pacifying routine with regular meal times

💫 Remember: Nervousness often indicates excess Vata dosha. Focus on grounding, warming foods and stable routines.`,

  'anxiety': `Anxiety in Ayurveda is often related to imbalanced Vata dosha. Here's how to find balance:

🌱 Natural Remedies:
- Ashwagandha tea before bedtime
- Warm milk with turmeric and a pinch of nutmeg
- Regular oil massage (Abhyanga) to calm the nervous system

🧘 **Lifestyle Adjustments:**
- Establish consistent daily routines
- Practice Yoga Nidra for deep relaxation
- Avoid excessive stimulants like caffeine

Always consult an Ayurvedic practitioner for personalized treatment plans.`,

  'stress': `Stress management through Ayurveda focuses on restoring natural balance:

🍃 Herbal Support:
- Brahmi for mental clarity
- Jatamansi for emotional stability
- Shankhpushpi for cognitive function

⚖️ Balancing Practices:
- Regular Pranayama (breathing exercises)
- Meditation or mindfulness practice
- Adequate rest following natural rhythms

🥗 Dietary Recommendations:
- Warm, cooked foods over raw/cold items
- Regular meal timings
- Avoid excessive spicy or stimulating foods`,

  'sleep': `For better sleep according to Ayurveda:

🌙 Evening Routine:
- Apply warm sesame oil to scalp and feet
- Drink warm milk with cardamom and honey
- Practice gentle yoga or stretching

💤 Sleep Hygiene:
- Sleep by 10 PM to align with natural rhythms
- Keep bedroom cool and dark
- Avoid screens 1 hour before bed

🌿 Natural Aids:
- Chamomile or passionflower tea
- Essential oils like lavender or sandalwood
- Regular meditation practice`,

  'digestion': `Ayurvedic approach to healthy digestion:

Strengthen Agni (Digestive Fire):
- Drink warm water with ginger before meals
- Eat largest meal at midday when digestion is strongest
- Chew food thoroughly and eat mindfully

🍽️ Eating Guidelines:
- Eat warm, freshly cooked foods
- Avoid cold drinks with meals
- Include digestive spices: cumin, coriander, fennel

🌿 Natural Remedies:
- Triphala powder at bedtime
- CCF tea (Cumin-Coriander-Fennel)
- Ginger-honey before meals`,

  'energy': `To boost energy naturally through Ayurveda:

☀️ Morning Practices:
- Wake up before sunrise
- Practice Surya Namaskara (Sun Salutations)
- Drink warm water with lemon and ginger

🌱 Energizing Foods:
- Dates, almonds, and seasonal fruits
- Kitchari for easy digestion
- Avoid heavy, processed foods

💪 Lifestyle Boosters:
- Regular exercise suited to your constitution
- Adequate rest and proper sleep schedule
- Practice Kapalabhati breathing for instant energy`,

  'immunity': `Building immunity the Ayurvedic way:

🛡️ Immune Boosters:
- Chyawanprash daily (1-2 tsp)
- Golden milk with turmeric before bed
- Include garlic, ginger, and tulsi in diet

🧘‍♀️ Lifestyle Practices:
- Regular Pranayama and yoga
- Adequate sleep (7-8 hours)
- Stress management through meditation

🌿 Seasonal Adjustment:
- Adapt diet and lifestyle to seasons
- Stay hydrated with warm water
- Avoid excessive cold or raw foods`,

  'weight': `Ayurvedic approach to healthy weight management:

⚖️ **Balance Your Agni:**
- Eat when truly hungry
- Make lunch your largest meal
- Sip warm water throughout the day

🥗 Food Guidelines:
- Include all six tastes in meals
- Choose whole, unprocessed foods
- Practice mindful, slow eating

🏃‍♀️ Activity & Lifestyle:
- Regular exercise suited to your dosha
- Adequate sleep (obesity often linked to poor sleep)
- Manage stress through yoga and meditation`
}

function getDefaultResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  // Check for specific nervousness/presentation keywords first
  if (lowerMessage.includes('nervous') || lowerMessage.includes('presenting') ||
      lowerMessage.includes('presentation') || lowerMessage.includes('public speaking')) {
    return defaultResponses['nervous']
  }

  // Check for other keywords
  for (const [keyword, response] of Object.entries(defaultResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  // Generic helpful responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
    return `Namaste! 🙏 Welcome to your personal Ayurveda assistant. I can help you with:

• Managing stress and anxiety
• Improving sleep and digestion
• Boosting energy and immunity
• Understanding dosha balance
• Natural remedies and lifestyle tips

What would you like guidance on today?`
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return `I'm here to guide you with Ayurvedic wisdom! I can assist with:

🧘‍♀️ Mental Wellness: Stress, anxiety, nervousness, focus
🌙 Sleep & Rest: Insomnia, sleep quality, relaxation
🔥 Digestion: Digestive issues, healthy eating habits
💪 Energy & Vitality: Natural energy boosters, fatigue
🛡️ Immunity: Building natural defenses
⚖️ Balance: Dosha assessment, seasonal routines

Just ask me about any health concern, and I'll share traditional Ayurvedic guidance!`
  }

  return null
}

const systemPrompt = `You are an experienced Ayurveda assistant and wellness guide. Your role is to provide helpful, accurate, and safe information about Ayurvedic principles, lifestyle recommendations, and general wellness guidance.

Key Guidelines:
1. Always provide information from traditional Ayurvedic perspective
2. Focus on preventive care and holistic wellness
3. Suggest natural remedies and lifestyle modifications
4. Explain dosha concepts (Vata, Pitta, Kapha) when relevant
5. Recommend consulting qualified practitioners for serious health issues
6. Never diagnose diseases or replace professional medical advice
7. Keep responses concise but informative (2-3 paragraphs max)
8. Use warm, caring tone with occasional Sanskrit terms
9. Include practical, actionable advice
10. Always emphasize the importance of individual constitution

Topics you can help with:
- Dosha assessment and balancing
- Seasonal routines (Ritucharya)
- Daily routines (Dinacharya)
- Ayurvedic nutrition principles
- Herbal remedies and preparations
- Yoga and meditation guidance
- Stress management techniques
- Sleep and digestion optimization
- General wellness practices

Remember to be encouraging and supportive while maintaining safety by recommending professional consultation when needed.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // First, check for hardcoded responses
    const defaultResponse = getDefaultResponse(message)
    if (defaultResponse) {
      return NextResponse.json({ response: defaultResponse })
    }

    // If no default response, try Gemini AI
    try {
      const prompt = `${systemPrompt}

User Question: ${message}

Please provide a helpful Ayurvedic response:`

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      return NextResponse.json({ response })
    } catch (aiError) {
      console.error('Gemini AI Error:', aiError)

      // Fallback response if AI fails
      const fallbackResponse = `I understand you're asking about "${message}". While I'm having technical difficulties with my AI system right now, here are some general Ayurvedic principles that might help:

🌿 **Universal Ayurvedic Tips:**
- Maintain regular daily routines (Dinacharya)
- Eat warm, freshly prepared foods
- Practice deep breathing exercises
- Stay hydrated with warm water
- Get adequate rest and sleep

For specific guidance on your concern, I recommend consulting with a qualified Ayurvedic practitioner. You can also try asking me again in a few moments.

🙏 Namaste!`

      return NextResponse.json({ response: fallbackResponse })
    }

  } catch (error) {
    console.error('Chatbot API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI assistant' },
      { status: 500 }
    )
  }
}