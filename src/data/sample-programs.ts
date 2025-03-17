import { Program } from '../types';

// Sample program data to use as fallback when API is not available
export const samplePrograms: Program[] = [
  {
    id: 1001,
    name: "Bachelor's in Computer Science",
    slug: "bachelors-in-computer-science",
    permalink: "https://studyweg.com/programs/bachelors-in-computer-science",
    date_created: "2023-09-15T12:00:00",
    description: "This comprehensive Computer Science program provides students with a strong foundation in programming, algorithms, data structures, and software engineering principles.",
    short_description: "Gain essential skills in software development, algorithms and computer systems.",
    price: "15000",
    regular_price: "15000",
    sale_price: "",
    categories: [
      { id: 101, name: "Technology", slug: "technology" },
      { id: 102, name: "Engineering", slug: "engineering" }
    ],
    tags: [
      { id: 201, name: "Top Program", slug: "top-program" }
    ],
    images: [
      {
        id: 301,
        src: "https://via.placeholder.com/800x600?text=Computer+Science",
        name: "Computer Science Program",
        alt: "Computer Science Program Image"
      }
    ],
    attributes: [
      {
        id: 401,
        name: "Program Level",
        position: 0,
        visible: true,
        variation: false,
        options: ["Bachelors"]
      },
      {
        id: 402,
        name: "Duration",
        position: 1,
        visible: true,
        variation: false,
        options: ["4 Years"]
      },
      {
        id: 403,
        name: "Country",
        position: 2,
        visible: true,
        variation: false,
        options: ["United States"]
      },
      {
        id: 404,
        name: "School",
        position: 3,
        visible: true,
        variation: false,
        options: ["Sample University"]
      }
    ],
    meta_data: [],
    institution: {
      name: "Sample University",
      location: "United States"
    }
  },
  {
    id: 1002,
    name: "Master's in Business Administration (MBA)",
    slug: "masters-in-business-administration",
    permalink: "https://studyweg.com/programs/masters-in-business-administration",
    date_created: "2023-09-14T14:30:00",
    description: "Our MBA program prepares students for leadership roles in various business sectors with specialized tracks in finance, marketing, and entrepreneurship.",
    short_description: "Develop advanced business leadership skills and expertise in key management areas.",
    price: "25000",
    regular_price: "28000",
    sale_price: "25000",
    categories: [
      { id: 103, name: "Business", slug: "business" },
      { id: 104, name: "Management", slug: "management" }
    ],
    tags: [
      { id: 202, name: "Fast Acceptance", slug: "fast-acceptance" }
    ],
    images: [
      {
        id: 302,
        src: "https://via.placeholder.com/800x600?text=MBA+Program",
        name: "MBA Program",
        alt: "MBA Program Image"
      }
    ],
    attributes: [
      {
        id: 405,
        name: "Program Level",
        position: 0,
        visible: true,
        variation: false,
        options: ["Masters"]
      },
      {
        id: 406,
        name: "Duration",
        position: 1,
        visible: true,
        variation: false,
        options: ["2 Years"]
      },
      {
        id: 407,
        name: "Country",
        position: 2,
        visible: true,
        variation: false,
        options: ["Canada"]
      },
      {
        id: 408,
        name: "School",
        position: 3,
        visible: true,
        variation: false,
        options: ["Business University"]
      }
    ],
    meta_data: [],
    institution: {
      name: "Business University",
      location: "Canada"
    }
  },
  {
    id: 1003,
    name: "Diploma in Culinary Arts",
    slug: "diploma-in-culinary-arts",
    permalink: "https://studyweg.com/programs/diploma-in-culinary-arts",
    date_created: "2023-09-13T10:15:00",
    description: "This culinary arts diploma prepares students for professional careers in the food industry with hands-on training from experienced chefs.",
    short_description: "Learn professional cooking techniques and food business management.",
    price: "12000",
    regular_price: "12000",
    sale_price: "",
    categories: [
      { id: 105, name: "Culinary Arts", slug: "culinary-arts" },
      { id: 106, name: "Hospitality", slug: "hospitality" }
    ],
    tags: [
      { id: 203, name: "Intake Offer", slug: "intake-offer" }
    ],
    images: [
      {
        id: 303,
        src: "https://via.placeholder.com/800x600?text=Culinary+Arts",
        name: "Culinary Arts Program",
        alt: "Culinary Arts Program Image"
      }
    ],
    attributes: [
      {
        id: 409,
        name: "Program Level",
        position: 0,
        visible: true,
        variation: false,
        options: ["Diploma"]
      },
      {
        id: 410,
        name: "Duration",
        position: 1,
        visible: true,
        variation: false,
        options: ["1 Year"]
      },
      {
        id: 411,
        name: "Country",
        position: 2,
        visible: true,
        variation: false,
        options: ["France"]
      },
      {
        id: 412,
        name: "School",
        position: 3,
        visible: true,
        variation: false,
        options: ["Culinary Institute"]
      }
    ],
    meta_data: [],
    institution: {
      name: "Culinary Institute",
      location: "France"
    }
  },
  {
    id: 1004,
    name: "PhD in Environmental Science",
    slug: "phd-in-environmental-science",
    permalink: "https://studyweg.com/programs/phd-in-environmental-science",
    date_created: "2023-09-12T09:00:00",
    description: "Our doctoral program in environmental science focuses on interdisciplinary research addressing critical environmental challenges and sustainable solutions.",
    short_description: "Conduct advanced research on environmental challenges and sustainability.",
    price: "18000",
    regular_price: "20000",
    sale_price: "18000",
    categories: [
      { id: 107, name: "Science", slug: "science" },
      { id: 108, name: "Environmental Studies", slug: "environmental-studies" }
    ],
    tags: [
      { id: 204, name: "Top Program", slug: "top-program" }
    ],
    images: [
      {
        id: 304,
        src: "https://via.placeholder.com/800x600?text=Environmental+Science",
        name: "Environmental Science Program",
        alt: "Environmental Science Program Image"
      }
    ],
    attributes: [
      {
        id: 413,
        name: "Program Level",
        position: 0,
        visible: true,
        variation: false,
        options: ["PhD"]
      },
      {
        id: 414,
        name: "Duration",
        position: 1,
        visible: true,
        variation: false,
        options: ["3-5 Years"]
      },
      {
        id: 415,
        name: "Country",
        position: 2,
        visible: true,
        variation: false,
        options: ["Australia"]
      },
      {
        id: 416,
        name: "School",
        position: 3,
        visible: true,
        variation: false,
        options: ["Research University"]
      }
    ],
    meta_data: [],
    institution: {
      name: "Research University",
      location: "Australia"
    }
  },
  {
    id: 1005,
    name: "Certificate in Digital Marketing",
    slug: "certificate-in-digital-marketing",
    permalink: "https://studyweg.com/programs/certificate-in-digital-marketing",
    date_created: "2023-09-11T11:45:00",
    description: "This certificate program covers the latest digital marketing strategies, social media platforms, SEO optimization, and analytics tools used in the industry.",
    short_description: "Master digital marketing strategies, social media and analytics.",
    price: "5000",
    regular_price: "6000",
    sale_price: "5000",
    categories: [
      { id: 109, name: "Marketing", slug: "marketing" },
      { id: 110, name: "Digital Media", slug: "digital-media" }
    ],
    tags: [
      { id: 205, name: "Fast Acceptance", slug: "fast-acceptance" }
    ],
    images: [
      {
        id: 305,
        src: "https://via.placeholder.com/800x600?text=Digital+Marketing",
        name: "Digital Marketing Program",
        alt: "Digital Marketing Program Image"
      }
    ],
    attributes: [
      {
        id: 417,
        name: "Program Level",
        position: 0,
        visible: true,
        variation: false,
        options: ["Certificate"]
      },
      {
        id: 418,
        name: "Duration",
        position: 1,
        visible: true,
        variation: false,
        options: ["6 Months"]
      },
      {
        id: 419,
        name: "Country",
        position: 2,
        visible: true,
        variation: false,
        options: ["United Kingdom"]
      },
      {
        id: 420,
        name: "School",
        position: 3,
        visible: true,
        variation: false,
        options: ["Digital Academy"]
      }
    ],
    meta_data: [],
    institution: {
      name: "Digital Academy",
      location: "United Kingdom"
    }
  }
];

// Extract all possible filter options from sample data
export const extractFilterOptions = () => {
  const levels = new Set<string>();
  const durations = new Set<string>();
  const countries = new Set<string>();
  const categories = new Set<string>();
  const universities = new Set<string>();
  
  samplePrograms.forEach(program => {
    // Extract levels
    const level = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
    if (level) levels.add(level);
    
    // Extract durations
    const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
    if (duration) durations.add(duration);
    
    // Extract countries
    const country = program.attributes?.find(attr => attr.name === "Country")?.options[0];
    if (country) countries.add(country);
    
    // Extract universities
    const university = program.attributes?.find(attr => attr.name === "School")?.options[0];
    if (university) universities.add(university);
    
    // Extract categories
    program.categories.forEach(category => {
      categories.add(category.name);
    });
  });
  
  return {
    levels: Array.from(levels),
    durations: Array.from(durations),
    countries: Array.from(countries),
    categories: Array.from(categories),
    universities: Array.from(universities)
  };
}; 