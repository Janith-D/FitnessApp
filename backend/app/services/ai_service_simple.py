"""
Mock AI Coach Service - Simple version without full AI dependencies
"""
import os
import random
from typing import Dict


class AICoachService:
    """Simple mock AI Coach service for testing"""
    
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AICoachService, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        """Initialize mock service"""
        self.responses = [
            "Great! Let's work on your fitness goals together!",
            "I'm here to help you achieve your fitness dreams!",
            "That's a great question! Let me help you with that.",
            "Stay motivated! You're doing awesome!",
            "Remember, consistency is key in fitness!",
        ]
    
    def chat(self, message: str, user_data: Dict) -> Dict:
        """
        Mock chat function
        
        Args:
            message: User's message
            user_data: User profile data
            
        Returns:
            Dict with response and metadata
        """
        # Simple keyword-based responses
        message_lower = message.lower()
        
        if any(word in message_lower for word in ['workout', 'exercise', 'training']):
            response = f"Based on your {user_data.get('fitness_level', 'beginner')} level, I recommend starting with a balanced routine!"
        elif any(word in message_lower for word in ['diet', 'nutrition', 'eat']):
            response = "Nutrition is super important! Make sure you're eating a balanced diet with plenty of protein."
        elif any(word in message_lower for word in ['weight', 'lose', 'gain']):
            goal = user_data.get('fitness_goal', 'general fitness')
            response = f"For your goal of {goal}, let's create a personalized plan together!"
        else:
            response = random.choice(self.responses)
        
        return {
            'response': response,
            'intent': 'general_fitness',
            'sentiment': 'positive',
            'suggestions': ['Tell me about your goals', 'Show workout plans', 'Track progress']
        }
    
    def generate_workout(self, user_data: Dict, preferences: Dict = None) -> Dict:
        """
        Mock workout generation
        
        Args:
            user_data: User profile
            preferences: Workout preferences
            
        Returns:
            Dict with workout plan
        """
        level = user_data.get('fitness_level', 'beginner')
        goal = user_data.get('fitness_goal', 'general_fitness')
        
        workouts = {
            'beginner': {
                'exercises': [
                    {'name': 'Push-ups', 'reps': 10, 'sets': 3},
                    {'name': 'Squats', 'reps': 15, 'sets': 3},
                    {'name': 'Plank', 'duration': '30s', 'sets': 3},
                ],
                'duration': 30
            },
            'intermediate': {
                'exercises': [
                    {'name': 'Pull-ups', 'reps': 8, 'sets': 3},
                    {'name': 'Lunges', 'reps': 12, 'sets': 3},
                    {'name': 'Mountain Climbers', 'reps': 20, 'sets': 3},
                ],
                'duration': 45
            },
            'advanced': {
                'exercises': [
                    {'name': 'Weighted Pull-ups', 'reps': 10, 'sets': 4},
                    {'name': 'Pistol Squats', 'reps': 8, 'sets': 3},
                    {'name': 'Burpees', 'reps': 15, 'sets': 4},
                ],
                'duration': 60
            }
        }
        
        workout_plan = workouts.get(level, workouts['beginner'])
        
        return {
            'workout_type': goal,
            'difficulty': level,
            'exercises': workout_plan['exercises'],
            'duration_minutes': workout_plan['duration'],
            'calories_estimate': workout_plan['duration'] * 8
        }


# Global instance
ai_coach = AICoachService()
