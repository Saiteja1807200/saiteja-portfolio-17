// Portfolio RAG chatbot — answers questions about Saiteja using a curated knowledge base
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KNOWLEDGE_BASE = `
# About Saiteja Akinepelli

Saiteja Akinepelli is a Full Stack Developer and Machine Learning enthusiast based in Hyderabad, Telangana, India. He recently completed his Master of Computer Applications (MCA) and is currently looking for a Full Stack or Machine Learning role where he can keep building useful things and learn from a strong team.

He builds full stack web apps and explores machine learning on the side. Most of his work lives at the intersection of clean React frontends, solid Python backends, and ML models that actually solve a problem. He likes shipping things that feel fast, look good, and hold up in the real world.

# Journey

He did his MCA at Vaageswari College of Engineering, where he really got into both software development and machine learning. Along the way he built full stack projects in React and PostgreSQL, including a service marketplace app with role based logins, bookings, and email notifications.

On the ML side he has worked with Python, OpenCV, Scikit-learn, and NLTK on things like a license plate recognition system and a model to flag fake recruitment posts. He is comfortable across the whole development cycle, from sketching out requirements to testing and shipping.

# Education

1. Master of Computer Applications (MCA) — Vaageswari College of Engineering, 2023–2026. Computer Science with focus on Machine Learning.
2. B.SC Computer Science — Chaitanya Degree College. Computer Science fundamentals.
3. Intermediate (MPC) — Sri Chaitanya Junior College. Mathematics, Physics, and Chemistry.

# Core Strengths

- Machine Learning: Scikit-learn & XGBoost, Computer Vision (OpenCV), NLP (NLTK), Model Evaluation
- Full Stack Development: React & TypeScript, PostgreSQL, REST APIs, Authentication & Auth Flows
- SDLC & Agile: Requirement Analysis, Agile Sprints, Testing & QA, CI/CD & Deployment
- Communication: Technical Writing, Documentation, Cross-team Collaboration, Knowledge Sharing

# Technical Skills (proficiency)

- React / TypeScript — 85%
- Python — 90%
- PostgreSQL / SQL — 85%
- Machine Learning (Scikit-learn) — 80%
- REST APIs & Backend Services — 80%
- Computer Vision (OpenCV) — 75%

# Soft Skills

Communication, Problem Solving, Teamwork, Attention to Detail, Adaptability.

# Specializations

- Frontend Development: React, TypeScript, Tailwind CSS, Responsive Design
- Backend & Databases: PostgreSQL, REST APIs, Authentication, Supabase
- Machine Learning: Scikit-learn, XGBoost, Model Evaluation, Exploratory Data Analysis
- Computer Vision & NLP: OpenCV, Image Processing, Text Analysis

# Projects

## 1. Home Hero — Home Services Marketplace Platform
Full-stack marketplace platform connecting customers with local service providers for household repair and maintenance services.
- Tech: React, Supabase, PostgreSQL, Resend, Vercel
- Features: Role-based authentication for customers, service providers and admin dashboards; booking lifecycle (pending, accepted, in-progress, completed); provider approval workflow and service management; automated email verification and booking notifications; mobile-responsive PWA.
- GitHub: https://github.com/Saiteja1807200/home-hero-now
- Live demo: https://homehero-three.vercel.app

## 2. Number Plate Recognition — Computer Vision System
Detects vehicle license plates from images or video streams and extracts alphanumeric characters automatically.
- Tech: Python, OpenCV, Tesseract OCR
- Features: Image preprocessing (grayscale, edge detection, contour analysis); automatic plate detection; OCR-based character extraction; optimized pipeline for real-time processing.
- GitHub: https://github.com/Saiteja1807200/automatic-number-plate-detection-using-opencv

## 3. Recruitment Fraud Detection — Machine Learning System
Identifies fraudulent job postings and suspicious recruitment activities on online job platforms.
- Tech: Python, Pandas, Scikit-learn, NLTK, XGBoost
- Features: Text preprocessing and feature extraction from job descriptions; fraud classification using Logistic Regression and XGBoost; data preprocessing and model evaluation.
- GitHub: https://github.com/Saiteja1807200/online-recruitment-fraud-detection

## 4. SOC Threat Detection — ML-Powered Cyber Security Framework
ML-driven SOC framework that detects cyber threats, analyzes security logs and prioritizes incidents to reduce manual investigation and false positives.
- Tech: Python, Scikit-learn, Pandas, NumPy, MySQL, Cyber Security, HTML, CSS, JavaScript
- Features: Automated threat detection and classification from security events and logs; risk scoring and incident prioritization for faster SOC response; web-based monitoring dashboard for real-time alert visualization; model evaluation using accuracy, precision, recall and F1-score.
- GitHub: https://github.com/Saiteja1807200/soc-ml-framework
- Related publication: User-Centric Machine Learning Framework for Cyber Security Operations Center

# Publications

## User-Centric Machine Learning Framework for Cyber Security Operations Center
- Authors: Akinepelli Saiteja, Mrs. T. Mounika, Dr. P. Venkateshwarlu
- Affiliation: Vaageswari College of Engineering (JNTUH), Karimnagar
- Summary: A machine-learning-driven SOC framework that reduces alert fatigue by automatically prioritizing security events, classifying genuine threats and visualizing incidents through a real-time monitoring dashboard.
- PDF: available in the Publications section of the portfolio

# Contact

- Email: saitejaakinepelli@gmail.com
- Phone: +91 7569247365
- Location: Hyderabad, Telangana, India
- LinkedIn: https://www.linkedin.com/in/saiteja-akinepelli
- GitHub: https://github.com/Saiteja1807200

- Instagram: https://www.instagram.com/saitejaaa_1807
- Resume: downloadable from the Resume page and Hero section of the portfolio



# Site Navigation

The portfolio has these pages: Home (/), About (/about), Resume (/resume), Blog (/blog), Contact (/contact). The Home page contains Hero, About, Education, Publications, Projects, Skills, and Contact sections.
`.trim();

const SYSTEM_PROMPT = `You are Saiteja's friendly portfolio assistant. Your job is to answer visitors' questions about Saiteja Akinepelli — his background, skills, projects, education, and how to contact him.

Rules:
- Only use information from the KNOWLEDGE BASE below. If something isn't covered, politely say you don't have that detail and suggest emailing saitejaakinepelli@gmail.com.
- Be concise, warm, and professional. Use short paragraphs or simple dash bullet points.
- Speak about Saiteja in third person ("he", "Saiteja").
- When relevant, include direct links (GitHub, demo, LinkedIn, resume) as plain URLs.
- Never invent projects, dates, employers, or credentials.
- IMPORTANT: Output plain text only. Do NOT use any markdown formatting — no asterisks for bold/italics (no **bold**, no *italic*), no hashes for headings, no backticks. Write headings as plain words followed by a colon if needed.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.filter((m) => m.role !== "system").slice(-20),
        ],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("AI gateway error", aiRes.status, errText);
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact the site owner." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a reply.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("portfolio-chat error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
