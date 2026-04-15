export interface Ingredient {
  name: string;
  amount: string;
  desc: string;
}

export interface Step {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export interface Recipe {
  id: string;
  title: string;
  time: string;
  complexity: string;
  img: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export const recipes: Recipe[] = [
  {
    id: "mushroom-risotto",
    title: "Wild Mushroom Risotto",
    time: "45 MIN",
    complexity: "INTERMEDIATE",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-uRkHtIfEuBb4f--rtkKD9RiFpEuh909N4wZCri7V0dQADQE2_CAynovkjvY7GSVWxsuY19Qr68-PWhb2E_75R7LneBexkqgQqbdbds6v7TUs80V0Q60BznNfbkCKymUrTykLC2oNg1dcmqR6aXqFp-fIJVIHodoryywyoXge3mxKaGynsNwdZuPgnfLuBuPxOXwhAB5FvHWXjAlxxOvZTzctpqD7KvmU8XDNfs4fJcxD9xFchOoIUFsYFrJDzKi1up48tyE-viA",
    description: "A foundational pillar of earthy Italian comfort. Our version emphasizes sustainability by using locally foraged wild mushrooms and organic vegetable stock for a rich, umami-dense experience.",
    ingredients: [
      { name: "Arborio Rice", amount: "300g", desc: "300g high-starch Italian rice for that signature creaminess." },
      { name: "Vegetable Stock", amount: "1.5L", desc: "1.5L organic vegetable broth, kept at a simmer." },
      { name: "Wild Mushrooms", amount: "500g", desc: "500g mixed Porcini, Shiitake, and Oyster, torn into bite-sized pieces." },
      { name: "Shallots", amount: "2 Units", desc: "2 medium shallots, finely minced for a subtle sweetness." },
      { name: "Garlic", amount: "2 Cloves", desc: "Heirloom variety, crushed to release oils." },
      { name: "Parmesan", amount: "60g", desc: "60g finely grated Parmigiano Reggiano for salty depth." },
      { name: "Fresh Thyme", amount: "To Taste", desc: "4 sprigs, leaves stripped and finely chopped for aromatics." }
    ],
    steps: [
      {
        num: "01",
        title: "Sauté Aromatics",
        desc: "Finely dice the shallot and garlic. In a heavy-bottomed pan, heat a drizzle of olive oil over medium-low heat. Sweat the aromatics until translucent and fragrant—avoid browning to maintain a clean flavor profile.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwAirriicx9KPDBhatXZbKFlnD1cH0lvFc63BSCGySVI4zZfnj1dccq9wr1Kycwsmb5HLFjJw0lmzbzoqYnDWYMLDGk9qv_kmFLojjfvAFlE1jUCRK_U5OgoJsWQrHc___9AbH6KGZPLaYXg0xcuaXNKSQMPQAAsiP5eD0WCh_ML19VAPx7-5iqIK3yGDd4nPQJ0wkJGLkTy_6zU90m8gtIOzT-cmqHnL1gTKFeOy7jZgnb4xJCJLapYNX7BFhdzRvt4Kgr0nYmJU"
      },
      {
        num: "02",
        title: "Toast the Grain",
        desc: "Add the Arborio rice to the pan. Increase heat slightly and toast for 2-3 minutes until the edges of the grains become translucent. This step is critical for a nutty aroma and proper starch release.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ss_ccr1ZhS6v2yuUZjumkegskJBZy30Y0FF_IVFSSHDhceuzLHARwI6FUw_Gr2xSpB3mGV8Efk8WInZGoHdyMAWjEBrbRbzFNjyR3HzF3D5AWC1p2im15B_cH5BP5bWil3KDjf3yYzb9_Cxc4WMmiGusxrxRVDv6K2RbFmwdeUVBILgHDOMyroqDuLsryUECZF0riLgOfnO8JVp2b13EyBDlxf7uqdBhtLc4Ro1uwcOOTCsFQGUzoDHmwHYqUeeevnh_9Ex7WFo"
      },
      {
        num: "03",
        title: "Gradual Hydration",
        desc: "Begin adding warm vegetable stock one ladle at a time. Stir continuously and wait for the liquid to be almost entirely absorbed before adding the next. This agitation releases the starches, creating the signature creaminess.",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArimbTZwKdbL61YF1t5JCWtBMWegC-iEf74iBzxa_0OnuYzzxrHMizu9T46L8ZV-4Eiw3cblbqkDUZiiOAW3g7TxTtmKj-mTV6tu-UzSaQFEKm0nDYWxfwS_Gz8wHQrY5YgxErIptTCiyxEAQVelHBY2FPnofMLYcGhKxcZYgcVJkGyLlzhJtoUEqHyhNTnzD6brlH1w-C7MZ_otTxYMN2qvJ08B6mHNf0TiFVnRAECF6HE_3-WYgq5BQsJZLX1cmYQyZymh84gtM"
      }
    ]
  },
  {
    id: "duck-breast",
    title: "Smoked Duck Breast",
    time: "60 MIN",
    complexity: "ADVANCED",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbusAwFR4J_Du0qNYdadJv72J0HJFAyIsapBmyEImeI9FZRIVQiLGx7PWvS-zo-U3VmDCxO7KAULDxqbRKRtWtMXyZsEakw1q8CA-4vvLMJVpdYFrLwWcnJpd8VgjKpR7V2Mck44blUz8gyiZ-4szyVFtlsN6d1y68wYUdcqmi30oYqhQ_9Zkgj0oYuFfp2zTFyjsltDkWmGGk3vKsVJ2xJRL05YVeu-z1TbbnrRpuBKEQ-HbJhIlM1waHlqQFaQJ6Q-3xypoC55E",
    description: "A sophisticated protein dish featuring tender duck breast smoked to perfection with cherry wood chips.",
    ingredients: [],
    steps: []
  },
  {
    id: "tomato-tart",
    title: "Heirloom Tomato Tart",
    time: "30 MIN",
    complexity: "EASY",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7QcdTvN6S50zVLUmkeGsHgs_ebFYT99FrUWKZV17RIrXpShY_avx3wp8A6FYbD08JQ3HdQ37E00_DHrGZNfWyG8B4SrDLUd19_PJFjrViAAaWovqTdIjF6dtgRVvOspDNNM6UulSGj2-y5YA-A2EJKjGrC7E0VtoREGhhXtvrEDvtOjTyUFdn9Ikew1ltdt_dhTH_yvHIZHcz8tMuzvxvC68QMuyL1A60os5TAkbx8zVaCDbSsODGsGyY1iCQPWd4vMkUuEiqTJU",
    description: "A vibrant, flaky tart celebrating the peak of summer harvest with heirloom tomatoes and fresh basil.",
    ingredients: [],
    steps: []
  },
  {
    id: "harvest-salad",
    title: "Spring Harvest Salad",
    time: "15 MIN",
    complexity: "EASY",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1MA5FqN2CQVw5sHpCXcLpeRuJkHzkKie5it4At8zIiYhFNtkt6uQwhts0bip0ufmgeH8Q92b0pB85y_hKs13kdWcmNl8kkgcR2bCkYIK5wZ1HWpBJQQa6KwRq3tciTP6lG0gJ8dsCnosnqqr2mLW4FmPOiq28fswbPQI0yjcdR3LOX3x4ZSviv8-zX2yE790zJ4xNXBnfmyg4dJRF4O_wS-NSrJF5Ba_jmg9mSPfeFAo1PD-tpSZnUykrlVULr8B9ndEyAWW16OI",
    description: "A light and refreshing assembly of seasonal greens, edible flowers, and a citrus-honey vinaigrette.",
    ingredients: [],
    steps: []
  },
  {
    id: "herb-lamb",
    title: "Herb Crusted Lamb",
    time: "50 MIN",
    complexity: "INTERMEDIATE",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ynOozUiykxxh7HQ0-kXGg34HyE0CPEYlg7ZrSmzIy0h7TM0YGi2PiGy6FpGtNn7pP4Qn4lY3HBjHI6vyQmOsFbihXgK-C8C7QVvgJSLAKgE35ShZhdVPv7NwnZOhOSXHh3wk0mVjLh0TDYINXbeV6FbE230CHkzsJFd3xHE5QPCpIKrAeMxGWFKKT6apDUJQ7UY_GDXafvwU82gY61RWEYtP2u0fGCwfepcSDcHvlEBxZTbBfAwV9EEkCFwCFdRFnATtqMyuJzU",
    description: "Succulent lamb chops encrusted with a vibrant herb and breadcrumb mixture, roasted to a perfect medium-rare.",
    ingredients: [],
    steps: []
  }
];
