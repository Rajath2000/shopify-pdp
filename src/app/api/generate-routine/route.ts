import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateRoutine, UserInputSchema } from '@/services/routineService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate inputs
    const validatedData = UserInputSchema.parse(body);
    
    // Process business logic
    const routine = generateRoutine(validatedData);
    
    // Simulate slight network delay for a more realistic premium "analyzing" feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(routine, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Error generating routine:', error);
    return NextResponse.json(
      { error: 'Internal server error while generating routine.' },
      { status: 500 }
    );
  }
}
