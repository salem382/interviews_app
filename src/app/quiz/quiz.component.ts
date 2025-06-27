import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../services/question.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-quiz',
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
   questions: Question[] = [];
  currentQuestionIndex = 0;
  currentQuestion: Question | null = null;
  quizFinished = false;
  userAnswer = '';
  score = 0;
  degree:number = 0;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionService.selectedQuestions$.subscribe(questions => {
      if (questions.length === 0) {
        // If no questions selected, redirect back
        this.router.navigate(['/']);
        return;
      }
      
      // Initialize quiz
      this.questions = [...questions];
      this.currentQuestionIndex = 0;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.degree = this.currentQuestion.degree;
      this.quizFinished = false;
      this.score = 0;
      this.userAnswer = '';
    });
  }

  submitAnswer(): void {
    if (!this.currentQuestion) return;

    // Here you would typically validate the answer
    // For now, we'll just count any answer as correct
    this.score += 1;
    
    // Mark question as solved
    const updatedQuestion = {
      ...this.currentQuestion,
      isSolvedBefore: true,
      degree:this.degree
    };
    this.questionService.updateQuestion(updatedQuestion);
    
    this.nextQuestion();
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.degree = this.currentQuestion.degree;
      this.userAnswer = '';
    } else {
      this.quizFinished = true;
      this.currentQuestion = null;
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.quizFinished = false;
    this.degree = this.currentQuestion.degree;
    this.userAnswer = '';
    this.score = 0;
  }
  // Add this method to your QuizComponent class
  copyQuestionToClipboard(): void {
    if (!this.currentQuestion) return;

    // Create a text string with the question and its metadata
    const textToCopy =`
        اريد ان اقوم باجابة هذا السؤال 
        Question: ${this.currentQuestion.question}\n
        واريد منك تقييم اجابتي واعطائي تقيم من 1 الي 10 
        وتخبرني بالاجابة الصحيحة وتصحح لي الاجابة ان كان هناك اخطاء 
        اجابتي :


        
      `;

    
    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(textToCopy).then(() => {
      // You can add some visual feedback here if you want
      console.log('Question copied to clipboard');
      // Alternatively, you could show a toast notification
    }).catch(err => {
      console.error('Failed to copy question: ', err);
    });
  }

  startNewQuiz(): void {
    this.router.navigate(['/']);
  }
}
