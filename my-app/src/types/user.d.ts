export interface User {
  id: string;
  fullname: string;
  age: number;
  education: "Grade school" | "High school" | "College";
  gender: "Male" | "Female" | "Other";
  skills: string[];
  bio: string;
}
