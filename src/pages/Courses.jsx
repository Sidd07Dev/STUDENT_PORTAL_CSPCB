import React from 'react';
import CourseInformation from '../components/CourseInformation';

const courses = [
  {
    title: 'AEC-1 (Environmental Science)',
    instructor: 'Bio Dept.',
    syllabus: '/syllabus/cs101.pdf',
    semester: 'Semester 1',
    credits:'2',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  },
  {
    title: 'Programming using C',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 1',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'  // Adding semester
  },
  {
    title: 'Digital Logic',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 1',
    credits:'6', 
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },
  {
    title: 'GE-1',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 1',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  // Add more course objects here
  {
    title: 'AEC-2 (English Communication/MIL)',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 2',
    credits:'2',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'Data Structures',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 2', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },
  {
    title: 'Programming using C++',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 2',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'
  },

  {
    title: 'GE-2',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 2',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'JAVA Programming',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 3',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'
  },
  {
    title: 'Database Systems',
    instructor: 'Prof. Kshirod Kumar Panda',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 3', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663622/zowhidwv74kqyxus0rcn.jpg'
  },
  {
    title: 'Discrete Mathematical Structures',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 3',
    credits:'6', 
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },

  {
    title: 'GE-3',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 3',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'Skill Enhancement Course-1 (SEC-1)',
    instructor: 'Eng. Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 3',
    credits:'2',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'Computer Networks',
    instructor: 'Prof. Kshirod Kumar Panda',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 4',
    credits:'6', 
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663622/zowhidwv74kqyxus0rcn.jpg'
  },
  {
    title: 'Operating Systems',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 4',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'
  },
  {
    title: 'Computer Graphics',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 4', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },

  {
    title: 'GE-4',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 4',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'Skill Enhancement Course-2 (SEC-2)',
    instructor: 'Math Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 4',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
  {
    title: 'Software Engineering',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 5',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'
  },
  {
    title: 'Web Technologies',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 5', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },
  {
    title: 'DSE–2: Unix Shell Programming',
    instructor: 'Prof. Kshirod Kumar Panda',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 5', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663622/zowhidwv74kqyxus0rcn.jpg'
  },
  {
    title: 'DSE–1: Numerical Techniques',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 5',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
    {
    title: 'Algorithm Design Techniques',
    instructor: 'Prof. Kshirod Kumar Panda',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 6',
    credits:'6', 
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663622/zowhidwv74kqyxus0rcn.jpg'
  },
  {
    title: 'DSE–3: Data Science',
    instructor: 'Prof. Ganeshwar Panda',
    syllabus: '/syllabus/cs102.pdf',
    semester: 'Semester 6',
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663549/mwbq439winhkujakx8ol.jpg'
  },
  {
    title: 'Artificial Intelligence',
    instructor: 'Prof. Sanjukta Behera',
    syllabus: '/syllabus/cs103.pdf',
    semester: 'Semester 6', 
    credits:'6',
    instructorImage:'https://res.cloudinary.com/codebysidd/image/upload/v1728663591/tjhvk2b1rjkblottyghf.jpg'
  },

  {
    title: 'DSE–4: Project Work / Dissertation',
    instructor: 'Respective Dept.',
    syllabus: '/syllabus/cs104.pdf',
    semester: 'Semester 6',
    credits:'6',
    instructorImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXk5ueutLfp6+y4vsCqsLTd4OHg4+S2u76nrrHAxcfFycva3d68wcSzuLvLz9HR1dZLOKU8AAAD4klEQVR4nO2cyXLDIAxAjVi8gOH//7bGSdM4cROQHMmZ4Z06Pb2RJcSarms0Go1Go9FoNBqNRqMhAgB01nufvMt/nhabJmUGkxkGM0/JSRvtAT4GZdSGQY3JniyyYMOsdjBqHk/lavWw53mNbDhLEoCbzP+ea2CjtOMK+Pm1aEafIQXie89MkvbsxjJRNQhnAIRC0SVbJ8kEcLrUM6uOgqblEV0TYJSKKpTm6C2qUUYVCqv+HpkRwFd7Loi0q5pq+sUE/u8P04tW/0I1sava+iRd6S2zKIw40aX+mU1R5XSBuahqh9K7oPJ2VYcWXVQ5TTGD/p8pZ6cCvOdC4BPtPCGkSs2eTRQmUkwNY/fHNNI7U76Jqu1JpmpmG1ITTVQNbKaUMWo1ZUvUNzsRb2EbUV2giSrFtqAiFtQy9eMy3d3Wq2HmMiWm6QJXnpJNuaZT32NK//psplRRtjz9otrvqZ+fazx1dVt8O7D1qK/p+12izqXYlifU+alhm59S5/yabxuFNu0zE5soRFpMGdemtM7PuTEJpETlPEIByjhl+LZQMpSY8u6f4xfSfEvoCxY7nzI9r2gH6N7Pf3iGFNXsosjyZy78C5hDiUHkkB9TVJwb539A/R76zH3A96taO6iKJOmFOlXuMR+vyn8MvVEtPjsXjWimeE0ll6NXii7LKaOFqn6j6t62ACN9Ae1Gerwi+0Av/uV/AYi9+Ve2F7oltQ+4qIcdVzOE5M4kumKfzn3NHE9QSDsAuDQF3a/oMC3RPF04b8Bia6331nUntszABmmbJxYlZ31KMX/6ZdJq1nFg1mGcYsrxPYXzIuFzcs5qfRqxLajLv/owRumUXSxj3vd526NyiKfUCd0+7WwKpuYW4jD00bPf6ru8MqlenSypwBzaRNrrizxdC3IvQl09/YvsEPznZSE9vS3CuCodP5sE4DVd8+o6f3KKZcPefAkv+6FpFtjxgO++ddWfWK5Sz0v+cR2PPpo6LkEfVY/eT/1IQK+u45F9i3yV6zVHZSv4oyvpkYMW2UA9eS7AHLGvij96qKKnt6yR1uOLmamvJ7GPNqoxNNWKB4UHQEkA/JsNFPiBlXYZvp4e2VpJR+NIVdz390xVfwfuhooj397DgJivMI34j9Q/SoDE/+0ziMeTIp6q/vGk0LfPVA5VhAeFVCofTzI3py01QaXfLidQczuVd2LyrFpRUzIj1M20uPw51iMvKb//Q36rQ6X09NKLdPx7Cgcq8Y+vVOkv/cj1pxtlplU/cvIZCq/RO2nP4le+AnP9J8ouKAvNTDeUPfY5QUEVNtTYa3EKL/7CCSgzbTTOxg9RuDPIovZyNwAAAABJRU5ErkJggg==' // Adding semester
  // Adding semester
  },
];

const Courses = () => {
  return (
    <div>
      <CourseInformation courses={courses} />
    </div>
  );
};

export default Courses;
