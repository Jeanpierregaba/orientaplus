
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyzeCareerRequest {
  assessmentId: string;
  assessmentData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      age: number;
      educationLevel: string;
      preferredSubjects?: string[];
    };
    personalityResults: Record<string, any>;
    aptitudeResults: Record<string, any>;
    professionalPreferences: Record<string, any>;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY is not set');
    }

    const { assessmentId, assessmentData } = await req.json() as AnalyzeCareerRequest;

    // Validate required data
    if (!assessmentId || !assessmentData) {
      return new Response(
        JSON.stringify({ error: 'Missing required data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Analyzing career options for assessment:', assessmentId);

    // Call Deepseek API
    const prompt = generatePrompt(assessmentData);
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Tu es un conseiller d\'orientation professionnel expert. Ton rôle est d\'analyser les données fournies sur un utilisateur et de proposer trois recommandations de carrière adaptées à son profil.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Deepseek API error:', errorData);
      throw new Error(`Deepseek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Deepseek response received');

    // Parse the AI recommendations
    const content = data.choices[0].message.content;
    let recommendations;
    
    try {
      recommendations = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse Deepseek response as JSON:', e);
      recommendations = { 
        recommendations: extractRecommendationsFromText(content) 
      };
    }

    // Create Supabase client with the Auth context of the logged-in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Store recommendations in the database
    const careersToInsert = recommendations.recommendations.map((rec: any, index: number) => ({
      assessment_id: assessmentId,
      recommendation_number: index + 1,
      career_title: rec.title || `Career Option ${index + 1}`,
      description: rec.description || null,
      skills_required: rec.skills || null,
      education_path: rec.education_path || null,
      industry: rec.industry || null,
      compatibility_score: rec.compatibility_score || null
    }));

    const { data: insertedData, error: insertError } = await supabaseClient
      .from('career_recommendations')
      .insert(careersToInsert);

    if (insertError) {
      throw new Error(`Error storing recommendations: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, recommendations: recommendations.recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

// Helper function to generate the prompt for Deepseek
function generatePrompt(data: AnalyzeCareerRequest['assessmentData']): string {
  const { personalInfo, personalityResults, aptitudeResults, professionalPreferences } = data;
  
  return `
Voici les données d'un utilisateur cherchant une orientation professionnelle :

# Informations personnelles
- Prénom: ${personalInfo.firstName || 'Non renseigné'}
- Nom: ${personalInfo.lastName || 'Non renseigné'}
- Âge: ${personalInfo.age || 'Non renseigné'}
- Niveau d'études: ${personalInfo.educationLevel || 'Non renseigné'}
- Matières préférées: ${personalInfo.preferredSubjects?.join(', ') || 'Non renseignées'}

# Résultats du test de personnalité
${JSON.stringify(personalityResults, null, 2)}

# Résultats du test d'aptitudes
${JSON.stringify(aptitudeResults, null, 2)}

# Préférences professionnelles
${JSON.stringify(professionalPreferences, null, 2)}

En fonction de ces données, propose trois recommandations de carrière adaptées au profil de l'utilisateur.

Pour chaque recommandation, inclus :
1. Un titre de métier ou domaine professionnel
2. Une brève description du métier
3. Les compétences requises (sous forme de tableau)
4. Un parcours éducatif recommandé
5. Le secteur d'activité
6. Un score de compatibilité avec le profil (en pourcentage)

Formate ta réponse en JSON selon ce schéma:
{
  "recommendations": [
    {
      "title": "Titre du métier 1",
      "description": "Description du métier 1",
      "skills": ["Compétence 1", "Compétence 2", ...],
      "education_path": "Parcours éducatif recommandé",
      "industry": "Secteur d'activité",
      "compatibility_score": 95
    },
    {
      "title": "Titre du métier 2",
      "description": "Description du métier 2",
      "skills": ["Compétence 1", "Compétence 2", ...],
      "education_path": "Parcours éducatif recommandé",
      "industry": "Secteur d'activité",
      "compatibility_score": 90
    },
    {
      "title": "Titre du métier 3",
      "description": "Description du métier 3",
      "skills": ["Compétence 1", "Compétence 2", ...],
      "education_path": "Parcours éducatif recommandé",
      "industry": "Secteur d'activité",
      "compatibility_score": 85
    }
  ]
}
`;
}

// Fallback function to extract recommendations from text if JSON parsing fails
function extractRecommendationsFromText(text: string): any[] {
  // Simple fallback implementation
  return [
    {
      title: "Option de carrière 1",
      description: "Impossible d'analyser la réponse de l'IA, veuillez réessayer.",
      skills: ["Analyse de données", "Communication"],
      education_path: "Formation générale",
      industry: "Divers",
      compatibility_score: 50
    },
    {
      title: "Option de carrière 2",
      description: "Impossible d'analyser la réponse de l'IA, veuillez réessayer.",
      skills: ["Résolution de problèmes", "Travail d'équipe"],
      education_path: "Formation générale",
      industry: "Divers",
      compatibility_score: 45
    },
    {
      title: "Option de carrière 3",
      description: "Impossible d'analyser la réponse de l'IA, veuillez réessayer.",
      skills: ["Adaptabilité", "Organisation"],
      education_path: "Formation générale",
      industry: "Divers",
      compatibility_score: 40
    }
  ];
}
