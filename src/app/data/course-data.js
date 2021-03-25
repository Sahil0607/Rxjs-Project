const payload = [
    {
        id: 1,
        description: "This is angular course",
        category: 'Beginner',
        lessonCount: 10,
    },
    {
        id: 2,
        description: "This is rxjs course",
        category: 'Advance',
        lessonCount: 11,
    },
    {
        id: 3,
        description: "This is react course",
        category: 'Beginner',
        lessonCount: 13,
    },
    {
        id: 4,
        description: "This is routing course",
        category: 'Advance',
        lessonCount: 15,
    }
];

const courseData = new Promise((resolve, reject) => {
    resolve(payload);
  });

export default courseData;