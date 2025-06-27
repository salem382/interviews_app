import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface Question {
  id: number;
  question: string;
  degree: number;
  isSolvedBefore: boolean;
  type: string;
  userScore?: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly QUESTIONS_COOKIE_KEY = 'app_questions';
  
  // Default questions (all 53)
  private defaultQuestions: Question[] = [
    { id: 1, question: 'What is Angular Framework?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 2, question: 'What is TypeScript?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 3, question: 'Write a pictorial diagram of Angular architecture?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 4, question: 'What are the key components of Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 5, question: 'What are directives?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 6, question: 'What are components?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 7, question: 'What is a template?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 8, question: 'What is a module?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 9, question: 'What are lifecycle hooks available?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 10, question: 'What is a data binding?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 11, question: 'What is metadata?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 12, question: 'What is Angular CLI?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 13, question: 'What is the difference between constructor and ngOnInit?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 14, question: 'What is a service?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 15, question: 'What is dependency injection in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 16, question: 'What is the purpose of async pipe?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 17, question: 'What is the purpose of *ngFor directive?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 18, question: 'What are pipes?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 19, question: 'What is a parameterized pipe?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 20, question: 'How do you chain pipes?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 21, question: 'What is a custom pipe?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 22, question: 'What is the difference between pure and impure pipe?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 23, question: 'What is HttpClient and its benefits?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 24, question: 'What are dynamic components?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 25, question: 'What are router events?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 26, question: 'What is activated route?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 27, question: 'How do you define routes?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 28, question: 'What is the purpose of Wildcard route?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 29, question: 'What is Angular Universal?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 30, question: 'What is ng-content?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 31, question: 'What is Angular Input and Output and EventEmitter?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 32, question: 'Template Reference Variable in Angular', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 33, question: 'What is ng-container in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 34, question: 'How to use ng-template and TemplateRef in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 35, question: 'How to Use ngTemplateOutlet in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 36, question: 'What are Signals?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 37, question: 'Why Signal?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 38, question: 'Angular Signals and Observables: How and When to Use Each', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 39, question: 'What is Effect in Signal?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 40, question: 'ElementRef in Angular', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 41, question: 'What is Renderer2?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 42, question: 'How to Use @ViewChild and @ViewChildren', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 43, question: 'ContentChild and ContentChildren in Angular', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 44, question: 'What are decorators in angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 45, question: 'AfterViewInit, AfterViewChecked, AfterContentInit and AfterContentChecked in Angular', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 46, question: 'What is View Encapsulation in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 47, question: 'What are Host and hostContext in Angular?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 48, question: 'Angular Change Detection How Does It Really Work?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 49, question: 'A Change Detection and Zone.js and Zoneless and Local Change Detection and Signals Story', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 50, question: 'Angular Signals Component API input and output and model', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 51, question: 'What is Resource API?', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 52, question: 'Explain dependency injection in Angular', degree: 0, isSolvedBefore: false, type: 'angular' },
    { id: 53, question: 'What are the four principles of OOP?', degree: 0, isSolvedBefore: false, type: 'angular' }
  ];

  private questions: Question[] = [];

  private selectedQuestions = new BehaviorSubject<Question[]>([]);
  selectedQuestions$ = this.selectedQuestions.asObservable();

  constructor(private cookieService: CookieService) {
    this.initializeQuestions();
  }

  private initializeQuestions(): void {
    const savedQuestions = this.cookieService.get(this.QUESTIONS_COOKIE_KEY);
    
    if (savedQuestions) {
      try {
        // Only use saved questions if they have the same length as our default
        const parsedQuestions = JSON.parse(savedQuestions);
        if (parsedQuestions.length === this.defaultQuestions.length) {
          this.questions = parsedQuestions;
        } else {
          this.questions = [...this.defaultQuestions];
          this.saveQuestionsToCookie();
        }
      } catch (e) {
        console.error('Failed to parse saved questions', e);
        this.questions = [...this.defaultQuestions];
        this.saveQuestionsToCookie();
      }
    } else {
      this.questions = [...this.defaultQuestions];
      this.saveQuestionsToCookie();
    }
  }

  private saveQuestionsToCookie(): void {
    this.cookieService.set(
      this.QUESTIONS_COOKIE_KEY,
      JSON.stringify(this.questions),
      30, // Expires in 30 days
      '/',
      undefined,
      false,
      'Lax'
    );
  }

  // ... rest of the methods remain the same ...
  getQuestions(): Question[] {
    return [...this.questions];
  }

  addQuestion(newQuestion: Question): void {
    this.questions.push(newQuestion);
    this.saveQuestionsToCookie();
  }

  updateQuestion(updatedQuestion: Question): void {
    const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
    if (index !== -1) {
      this.questions[index] = updatedQuestion;
      this.saveQuestionsToCookie();
    }
  }

  setSelectedQuestions(questions: Question[]): void {
    this.selectedQuestions.next(questions);
  }

  resetQuestionsStatus(): void {
    this.questions = this.questions.map(q => ({ ...q, isSolvedBefore: false, userScore: undefined }));
    this.saveQuestionsToCookie();
  }

  // New method to clear cookies and reset to default questions
  resetToDefaultQuestions(): void {
    this.cookieService.delete(this.QUESTIONS_COOKIE_KEY);
    this.questions = [...this.defaultQuestions];
    this.saveQuestionsToCookie();
  }
}