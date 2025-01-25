export const initialState = localStorage.getItem('rpg-user-data') ?
  JSON.parse(localStorage.getItem('rpg-user-data') ?? '""')
  : {
      name: 'Unknown',
      theme: 'theme-1',
      level: 1,
      xp: 0,
      skillsSorting: 'CC',
      actionsSorting: 'CC',
      activeTab: '',
      skills: [
        {
          name: 'Endurance',
          level: 1,
          xp: 0,
          actions: [
            {
              text: 'Run 10k',
              xp: 100,
            },
            {
              text: 'Skip leg-day',
              xp: -100,
            },
          ],
        },
        {
          name: 'Strength',
          level: 1,
          xp: 0,
          actions: [
            {
              text: 'Go to GYM',
              xp: 200,
            },
            {
              text: 'Lie in bed the whole day',
              xp: -200,
            },
          ],
        },
      ],
      history: [],
};
      