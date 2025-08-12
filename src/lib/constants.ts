import { BookOpen, Landmark, User, Calendar, Lightbulb, ScrollText } from "lucide-react";
import type { Question } from "./types";

export const HISTORY_DATA = [
  {
    year: "1857",
    title: "The First War of Independence ⚔️",
    description: "Often called the Sepoy Mutiny, this was a major, but ultimately unsuccessful, uprising against the rule of the British East India Company.",
    image: "https://miro.medium.com/v2/1*xzqPgi6PLvlRZJeTzVcDGA.jpeg",
    hint: "sepoy mutiny"
  },
  {
    year: "1885",
    title: "Formation of Indian National Congress 🤝",
    description: "The Indian National Congress (INC) was founded, which later became a pivotal participant in the Indian Independence Movement.",
    image: "https://res.cloudinary.com/dkplc2mbj/image/upload/v1600173756/1_96d58a84f6.jpg",
    hint: "gandhi nehru"
  },
  {
    year: "1905",
    title: "Partition of Bengal 💔",
    description: "The British partitioned Bengal, a move that was fiercely opposed by Indians and led to a surge in nationalist sentiment.",
    image: "https://www.peoplesreview.in/wp-content/uploads/2023/08/bengal-partition-map.jpg",
    hint: "partition of bengal map"
  },
  {
    year: "1915",
    title: "Mahatma Gandhi's Return 🙏",
    description: "Mahatma Gandhi returned to India from South Africa and soon became the leader of the nationalist movement.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5aHXCpTstjV6y8lrg-eVvMIEZL5xbUPWMHA&s",
    hint: "mahatma gandhi"
  },
  {
    year: "1920",
    title: "Non-Cooperation Movement 🚶",
    description: "Led by Gandhi, this was one of the first mass movements of non-violent resistance against British rule.",
    image: "https://mediaindia.eu/wp-content/uploads/2020/02/770e2cbbbaff83e0eb734fc9919c5948-1200x675.jpeg",
    hint: "gandhi statue"
  },
  {
    year: "1930",
    title: "Dandi March (Salt March) 🧂",
    description: "An act of civil disobedience led by Gandhi to protest the British salt tax. The 240-mile march was a turning point.",
    image: "https://mediaindia.eu/wp-content/uploads/2020/02/770e2cbbbaff83e0eb734fc9919c5948-1200x675.jpeg",
    hint: "salt march"
  },
  {
    year: "1942",
    title: "Quit India Movement ✊",
    description: "A mass civil disobedience movement launched by Gandhi, demanding an end to British rule in India.",
    image: "https://images.firstpost.com/wp-content/uploads/2020/08/quit-india-movement_640.jpg?im=FitAndFill=(596,336)",
    hint: "quit india movement"
  },
  {
    year: "1947",
    title: "Independence and Partition 🎉",
    description: "Jawaharlal Nehru became the first Prime Minister of India, marking the birth of a free nation.",
    image: "https://www.hindustantimes.com/static/partition/assets/img/gallery/2667868.jpg",
    hint: "jawaharlal nehru"
  },
];

export const FACTS_DATA = [
    {
      icon: Landmark,
      title: "The Name 'India' 🌏",
      description: "The name 'India' is derived from the River Indus, the valleys around which were the home of the first inhabitants of the Indian subcontinent.",
    },
    {
      icon: Calendar,
      title: "Shared Independence Day 🤝",
      description: "India shares its Independence Day with four other countries: North Korea, South Korea, Bahrain, and Republic of the Congo.",
    },
    {
      icon: User,
      title: "Designer of the Flag 🎨",
      description: "The Indian national flag was designed by Pingali Venkayya, a freedom fighter from Andhra Pradesh. The first variant was presented in 1921.",
    },
    {
      icon: Lightbulb,
      title: "First Prime Minister 👨‍🏫",
      description: "Jawaharlal Nehru, the first Prime Minister of independent India, hoisted the national flag at the Red Fort in Delhi on August 15, 1947.",
    },
    {
        icon: ScrollText,
        title: "National Anthem Adoption 🎶",
        description: "'Jana Gana Mana', written by Rabindranath Tagore, was officially adopted as the national anthem of India on January 24, 1950.",
    },
    {
        icon: BookOpen,
        title: "Goa's Liberation 🕊️",
        description: "Goa was a Portuguese colony and was liberated by the Indian Army in 1961, becoming a part of India only after 14 years of independence.",
    }
];

export const GALLERY_IMAGES = [
  {
    src: "https://t4.ftcdn.net/jpg/06/50/38/27/360_F_650382732_4y00C8CkuVbduv7PagHc9waIHgTghGLb.jpg",
    alt: "Image of the Indian flag waving",
    description: "The tricolor flag soaring high. 🇮🇳",
    hint: "Indian flag"
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmr0TlMc5KdmxcCnNlkvFOK4FYfH56tBi68g&s",
    alt: "A portrait of Mahatma Gandhi",
    description: "Mahatma Gandhi, the Father of the Nation. 🙏",
    hint: "Mahatma Gandhi"
  },
  {
    src: "https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg",
    alt: "The Red Fort in Delhi",
    description: "The iconic Red Fort, Delhi. 🏰",
    hint: "Red Fort"
  },
  {
    src: "https://i.pinimg.com/736x/21/36/10/21361033cca8fe4c5a503ede120cb52d.jpg",
    alt: "A crowd celebrating Independence Day",
    description: "Joyous citizens celebrating freedom. 🎉",
    hint: "crowd celebration"
  },
  {
    src: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2009/9/6/1252253835274/Second-world-war-Jawaharl-001.jpg?width=465&dpr=1&s=none&crop=none",
    alt: "Jawaharlal Nehru giving a speech",
    description: "India's first Prime Minister, Jawaharlal Nehru. 🎤",
    hint: "Jawaharlal Nehru"
  },
  {
    src: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201808/indian_flag.jpeg?VersionId=2xKH3EU60TaAjZPZEUz2_8D88ZfTvylo",
    alt: "Children holding small Indian flags",
    description: "The future generation with the tricolor. 👧👦",
    hint: "children flags"
  },
   {
    src: "https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/buzzlife/IndiaTv6a0a87_REPUBLIC-DAY.jpg",
    alt: "Independence Day parade",
    description: "The grand parade in New Delhi. 🇮🇳",
    hint: "parade delhi"
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/99/India_Gate_on_the_evening_of_77th_Independence_day.jpg",
    alt: "India Gate monument",
    description: "The majestic India Gate. ✨",
    hint: "India Gate"
  },
];

export const QUOTES_DATA = [
    {
      quote: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. 🕛",
      author: "Jawaharlal Nehru",
    },
    {
      quote: "Freedom is not worth having if it does not include the freedom to make mistakes. 🤔",
      author: "Mahatma Gandhi",
    },
    {
      quote: "It is blood alone that can pay the price of freedom. Give me blood, and I will give you freedom! 🩸",
      author: "Subhas Chandra Bose",
    },
    {
      quote: "So long as you do not achieve social liberty, whatever freedom is provided by the law is of no avail to you. ⚖️",
      author: "B. R. Ambedkar",
    },
    {
      quote: "Swaraj is my birthright and I shall have it. ✊",
      author: "Bal Gangadhar Tilak",
    },
    {
      quote: "A country's greatness lies in its undying ideals of love and sacrifice that inspire the mothers of the race. ❤️",
      author: "Sarojini Naidu",
    },
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    question: "In which year did India get its independence? 🇮🇳",
    options: ["1945", "1947", "1950", "1942"],
    correctAnswer: "1947",
    explanation: "India gained independence from British rule on August 15, 1947.",
  },
  {
    question: "Who was the first Prime Minister of India? 👨‍🏫",
    options: ["Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    correctAnswer: "Jawaharlal Nehru",
    explanation: "Jawaharlal Nehru became the first Prime Minister of Independent India and served until his death in 1964.",
  },
  {
    question: "The Jallianwala Bagh massacre took place in which city? 📍",
    options: ["Delhi", "Mumbai", "Amritsar", "Kolkata"],
    correctAnswer: "Amritsar",
    explanation: "The Jallianwala Bagh massacre occurred in Amritsar, Punjab, on April 13, 1919.",
  },
];
