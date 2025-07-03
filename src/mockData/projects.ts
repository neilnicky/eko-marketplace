export const mockProjects = [
  {
    id: "proj101",
    name: "Green Harvest Farm",
    description:
      "A sustainable farm focused on organic produce and community Supported Agriculture (CSA). We aim to provide fresh, healthy food while maintaining ecological balance.",
    profile_picture_url:
      "https://images.pexels.com/photos/3468822/pexels-photo-3468822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    contact_email: "greenharvest@example.com",
    website_url: "https://www.greenharvestfarm.com",
    manager_id: "user123", // Assuming this matches the currentUser.id for ownership
    location: {
      city: "Ruraltown",
      state_province: "Springfield",
      latitude: -23.55052,
      longitude: -46.633308,
    },
    main_category: "sustainable_agriculture",
    main_activities: ["organic farming", "CSA", "community outreach"],
    created_date: "2023-01-15T10:00:00Z",
  },
];

// export const mockPublications = [
//     {
//       id: "pub201",
//       project_id: "proj101",
//       content: "Our first harvest of organic heirloom tomatoes! They're absolutely delicious and available now at our farm stand.",
//       image_urls: [
//         "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         "https://images.pexels.com/photos/1090333/pexels-photo-1090333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//       ],
//       created_date: "2024-06-25T14:30:00Z"
//     },
// ]
