import { Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
     { path: '', component: QuestionListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '' }
];
