import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  meals = [
    {
      name: 'Pâtes au Pesto',
      image: 'https://via.placeholder.com/150',
      category: 'Derniers Repas',
    },
    {
      name: 'Poulet Grillé',
      image: 'https://via.placeholder.com/150',
      category: 'Derniers Repas',
    },
    {
      name: 'Salade César',
      image: 'https://via.placeholder.com/150',
      category: 'Derniers Repas',
    },
    {
      name: 'Soupe de légumes',
      image: 'https://via.placeholder.com/150',
      category: 'Derniers Repas',
    },
    {
      name: 'Tacos au poulet',
      image: 'https://via.placeholder.com/150',
      category: 'Derniers Repas',
    },
    {
      name: 'Pâtes aux légumes',
      image: 'https://via.placeholder.com/150',
      category: 'Repas végétariens',
    },
    {
      name: 'Ratatouille',
      image: 'https://via.placeholder.com/150',
      category: 'Repas végétariens',
    },
    {
      name: 'Quinoa salad',
      image: 'https://via.placeholder.com/150',
      category: 'Repas végétariens',
    },
    {
      name: 'Veggie Burger',
      image: 'https://via.placeholder.com/150',
      category: 'Repas végétariens',
    },
    {
      name: 'Risotto aux champignons',
      image: 'https://via.placeholder.com/150',
      category: 'Repas végétariens',
    },
  ];
}
