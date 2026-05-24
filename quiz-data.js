// Add or change animals here! Each entry needs:
//   image:   a URL to the picture (Wikimedia Commons URLs work great)
//   correct: the right answer
//   options: 4 choices, including the correct one (order will be shuffled)
//   credit:  short photo credit (shown small under the image)
const QUIZ_ANIMALS = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/1280px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
    correct: "Lion",
    options: ["Lion", "Tiger", "Cheetah", "Leopard"],
    credit: "Giles Laurent / Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/178_Male_African_bush_elephant_in_Etosha_National_Park_Photo_by_Giles_Laurent.jpg/1280px-178_Male_African_bush_elephant_in_Etosha_National_Park_Photo_by_Giles_Laurent.jpg",
    correct: "African Elephant",
    options: ["African Elephant", "Asian Elephant", "Hippo", "Rhinoceros"],
    credit: "Giles Laurent / Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/1280px-Giraffe_Mikumi_National_Park.jpg",
    correct: "Giraffe",
    options: ["Giraffe", "Okapi", "Camel", "Zebra"],
    credit: "Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg/1280px-Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg",
    correct: "Emperor Penguin",
    options: ["Emperor Penguin", "King Penguin", "Puffin", "Auk"],
    credit: "Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Red_Panda%2C_Gentle_Tree-Dweller_of_the_Himalayas.jpg/1280px-Red_Panda%2C_Gentle_Tree-Dweller_of_the_Himalayas.jpg",
    correct: "Red Panda",
    options: ["Red Panda", "Raccoon", "Lemur", "Quokka"],
    credit: "Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/1280px-Male_cheetah_facing_left_in_South_Africa.jpg",
    correct: "Cheetah",
    options: ["Cheetah", "Leopard", "Jaguar", "Serval"],
    credit: "Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Llamas%2C_Vernagt-Stausee%2C_Italy.jpg/1280px-Llamas%2C_Vernagt-Stausee%2C_Italy.jpg",
    correct: "Llama",
    options: ["Llama", "Alpaca", "Guanaco", "Vicuña"],
    credit: "Wikimedia Commons",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/American_Alligator.jpg/1280px-American_Alligator.jpg",
    correct: "American Alligator",
    options: ["American Alligator", "Saltwater Crocodile", "Caiman", "Gharial"],
    credit: "Wikimedia Commons",
  },
];
