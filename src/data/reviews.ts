export type Review = {
  name: string;
  timeAgo: string;
  rating: number;
  text: string;
};

// Google reviews shown on each branch page. Keyed by branch slug.
export const REVIEWS: Record<"greater-kailash" | "gurugram", Review[]> = {
  "greater-kailash": [
    {
      name: "Priya S.",
      timeAgo: "4 months ago",
      rating: 5,
      text:
        "The clinic is spotless and well run, and the staff is professional yet warm. What stood out most was how thoroughly the doctors explained the treatment before starting — their whole approach to skin and wellness felt genuinely considered.",
    },
    {
      name: "Humam Ansari",
      timeAgo: "2 months ago",
      rating: 5,
      text:
        "Walked out feeling like the best version of myself. The team stayed calm and clearly understood exactly what I was looking for — no over-selling, just the right guidance.",
    },
    {
      name: "Manju Hooda",
      timeAgo: "2 months ago",
      rating: 5,
      text:
        "Attended the launch event for their new Soprano machine and came away impressed by the hospitality. My consultation with Dr. Deboshri was excellent — informative and reassuring from the start.",
    },
    {
      name: "Kalua Kalua",
      timeAgo: "3 weeks ago",
      rating: 5,
      text:
        "Really appreciated the quality of care and how personalized the attention was throughout. An easy clinic to recommend to anyone considering treatment here.",
    },
    {
      name: "Seema Maggo",
      timeAgo: "2 months ago",
      rating: 5,
      text:
        "My doctor was patient and broke everything down clearly before we began. The treatment itself delivered real results — would recommend without hesitation.",
    },
    {
      name: "Shubhankar Banerjee",
      timeAgo: "3 weeks ago",
      rating: 5,
      text:
        "Came in for a hair transplant and the whole process — from the initial consult onward — was handled with real care and attention to detail.",
    },
  ],
  gurugram: [
    {
      name: "Tamsa Bheel",
      timeAgo: "3 weeks ago",
      rating: 5,
      text:
        "A genuinely wonderful visit — my skin was prepped carefully and I felt comfortable the entire time. The doctors and staff were kind, professional, and clearly cared about getting things right.",
    },
    {
      name: "Suisui",
      timeAgo: "3 weeks ago",
      rating: 5,
      text:
        "Easily one of the best clinics I've been to. The staff were amazing and the service was chef's-kiss level — already planning to come back and telling everyone to check it out.",
    },
    {
      name: "Veronica Dangmei",
      timeAgo: "a month ago",
      rating: 5,
      text:
        "Friendly, professional staff and excellent service throughout. My facial left my skin feeling refreshed, hydrated, and glowing — highly recommend for quality skincare treatments.",
    },
    {
      name: "Sapna Tewari",
      timeAgo: "a month ago",
      rating: 5,
      text:
        "A great overall experience — the team was professional and my facial left my skin feeling noticeably refreshed. Special thanks to Veronica for the care she took.",
    },
    {
      name: "Yuvraj Singh",
      timeAgo: "a month ago",
      rating: 5,
      text:
        "Came in for a stubborn breakout and had a fantastic first session with Dr. Khushboo. The hospitality stood out, and the staff made the whole visit feel completely comfortable.",
    },
    {
      name: "Saurabh Jain",
      timeAgo: "a month ago",
      rating: 5,
      text:
        "In for a PRP session and everything about it was excellent — the doctor, the hygiene, the overall setup. No long waits either, which made the whole visit easy.",
    },
    {
      name: "Manoj Arya",
      timeAgo: "a month ago",
      rating: 5,
      text:
        "Came in for microneedling and really enjoyed the clinic's vibe from start to finish — a great overall experience that's got me planning to return for more treatments.",
    },
  ],
};
