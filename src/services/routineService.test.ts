import { generateRoutine, UserInput } from './routineService';

describe('routineService', () => {
  it('should generate a routine for a beginner with dry skin', () => {
    const input: UserInput = {
      primaryGoal: 'glow',
      skinType: 'dry',
      familiarity: 'beginner'
    };

    const result = generateRoutine(input);

    expect(result.isRightForYou).toBe(true);
    expect(result.matchScore).toBe(100); // 85 + 10 (dry) + 5 (glow) = 100
    
    // Beginner dry skin should have exactly 3 night steps (Cleanse, Apply, Massage)
    expect(result.routine.length).toBe(3);
    expect(result.routine[0].action).toBe('Cleanse');
    expect(result.routine[1].action).toBe('Apply');
    expect(result.routine[1].description).toContain('3-4 drops');
    expect(result.routine[2].action).toBe('Massage');
  });

  it('should adjust routine for oily skin and intermediate familiarity', () => {
    const input: UserInput = {
      primaryGoal: 'anti-aging',
      skinType: 'oily',
      familiarity: 'intermediate'
    };

    const result = generateRoutine(input);

    expect(result.matchScore).toBe(75); // 85 - 10 (oily)
    expect(result.routine.some(r => r.action === 'Apply' && r.description.includes('1-2 drops'))).toBe(true);
    
    // Check tips for oily skin
    expect(result.tips.some(t => t.includes('1-2 drops'))).toBe(true);
  });

  it('should include toning and morning hydration for advanced dry skin', () => {
    const input: UserInput = {
      primaryGoal: 'hydration',
      skinType: 'dry',
      familiarity: 'advanced'
    };

    const result = generateRoutine(input);

    // Should include Tone, Apply, Massage, Hydrate (Morning) in addition to Cleanse
    expect(result.routine.length).toBe(5);
    expect(result.routine.some(r => r.action === 'Tone')).toBe(true);
    expect(result.routine.some(r => r.action === 'Massage')).toBe(true);
    expect(result.routine.some(r => r.action === 'Hydrate' && r.timeOfDay === 'Morning')).toBe(true);
  });
});
