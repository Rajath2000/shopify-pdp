import { z } from "zod";

export const UserInputSchema = z.object({
  primaryGoal: z.enum(["glow", "anti-aging", "hydration", "pigmentation"]),
  skinType: z.enum(["dry", "oily", "combination", "sensitive"]),
  familiarity: z.enum(["beginner", "intermediate", "advanced"]),
});

export type UserInput = z.infer<typeof UserInputSchema>;

export interface RoutineStep {
  step: number;
  timeOfDay: "Morning" | "Night" | "Both";
  action: string;
  description: string;
}

export interface RoutineResult {
  isRightForYou: boolean;
  matchScore: number;
  verdict: string;
  routine: RoutineStep[];
  tips: string[];
}

export function generateRoutine(input: UserInput): RoutineResult {
  let matchScore = 85;
  let isRightForYou = true;
  let verdict = "Kumkumadi Tailam is an excellent fit for your needs!";
  const routine: RoutineStep[] = [];
  const tips: string[] = [];

  // Logic based on skin type
  if (input.skinType === "oily") {
    matchScore -= 10;
    verdict = "Kumkumadi Tailam can work for you, but requires mindful application.";
    tips.push("Since you have oily skin, use only 1-2 drops and consider applying it every alternate night.");
  } else if (input.skinType === "dry") {
    matchScore += 10;
    verdict = "Kumkumadi Tailam is absolutely perfect for dry skin, offering deep nourishment.";
    tips.push("Apply 3-4 drops to a slightly damp face to lock in maximum moisture.");
  } else if (input.skinType === "sensitive") {
    tips.push("Always do a patch test first. Start with 1 drop mixed with your regular moisturizer.");
  }

  // Logic based on goal
  if (input.primaryGoal === "glow") {
    matchScore += 5;
    tips.push("Kumkumadi is literally named after saffron (Kumkuma) which is renowned for imparting a golden glow.");
  } else if (input.primaryGoal === "pigmentation") {
    matchScore += 5;
    tips.push("Consistency is key for pigmentation. Expect visible results after 3-4 weeks of regular use.");
  }

  // Build the routine
  routine.push({
    step: 1,
    timeOfDay: "Night",
    action: "Cleanse",
    description: "Wash your face with a mild natural cleanser and pat dry, leaving it slightly damp."
  });

  if (input.familiarity === "advanced") {
    routine.push({
      step: 2,
      timeOfDay: "Night",
      action: "Tone",
      description: "Apply pure rose water to balance skin pH before the oil."
    });
  }

  routine.push({
    step: input.familiarity === "advanced" ? 3 : 2,
    timeOfDay: "Night",
    action: "Apply",
    description: `Take ${input.skinType === 'oily' ? '1-2' : '3-4'} drops of Kumkumadi Tailam on your palm.`
  });

  routine.push({
    step: input.familiarity === "advanced" ? 4 : 3,
    timeOfDay: "Night",
    action: "Massage",
    description: "Gently massage onto your face and neck using upward strokes until fully absorbed."
  });

  if (input.skinType === "dry" && input.familiarity !== "beginner") {
    routine.push({
      step: input.familiarity === "advanced" ? 5 : 4,
      timeOfDay: "Morning",
      action: "Hydrate",
      description: "In the morning, wash with plain water and apply a light moisturizer. The oil works overnight."
    });
  }

  // Cap score at 100
  matchScore = Math.min(matchScore, 100);

  return {
    isRightForYou,
    matchScore,
    verdict,
    routine,
    tips
  };
}
