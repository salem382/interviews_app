import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {
  allQuestions: Question[] = [];
  filteredQuestions: Question[] = [];
  selectedQuestions: Question[] = [];

  // Filter options
  degrees: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  types: string[] = ['angular', 'oop', 'javascript', 'solid principle', 'design'];
  solvedOptions: boolean[] = [true, false];

  // Selected filters
  selectedDegrees: number[] = [];
  selectedTypes: string[] = [];
  selectedSolved: boolean[] = [];

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    this.allQuestions = this.questionService.getQuestions();
    this.filteredQuestions = [...this.allQuestions];
  }

  toggleDegreeFilter(degree: number): void {
    const index = this.selectedDegrees.indexOf(degree);
    if (index === -1) {
      this.selectedDegrees.push(degree);
    } else {
      this.selectedDegrees.splice(index, 1);
    }
  }

  toggleTypeFilter(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index === -1) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes.splice(index, 1);
    }
  }

  toggleSolvedFilter(solved: boolean): void {
    const index = this.selectedSolved.indexOf(solved);
    if (index === -1) {
      this.selectedSolved.push(solved);
    } else {
      this.selectedSolved.splice(index, 1);
    }
  }

  applyFilters(): void {
    this.filteredQuestions = this.allQuestions.filter(question => {
      const degreeMatch = this.selectedDegrees.length === 0 || 
                         this.selectedDegrees.includes(question.degree);
      const typeMatch = this.selectedTypes.length === 0 || 
                       this.selectedTypes.includes(question.type);
      const solvedMatch = this.selectedSolved.length === 0 || 
                         this.selectedSolved.includes(question.isSolvedBefore);
      return degreeMatch && typeMatch && solvedMatch;
    });
  }

  toggleQuestionSelection(question: Question): void {
    const index = this.selectedQuestions.findIndex(q => q.id === question.id);
    if (index === -1) {
      this.selectedQuestions.push(question);
    } else {
      this.selectedQuestions.splice(index, 1);
    }
  }

  isSelected(question: Question): boolean {
    return this.selectedQuestions.some(q => q.id === question.id);
  }

  startQuiz(): void {
    this.questionService.setSelectedQuestions(this.selectedQuestions);
    this.router.navigate(['/quiz']);
  }
}