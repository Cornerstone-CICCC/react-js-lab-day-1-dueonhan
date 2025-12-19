import { useState, type FormEvent, type ChangeEvent } from "react";

import type { User } from "../types/user";

type Props = {
  onAdd: (user: User) => void;
};

const UserForm = ({ onAdd }: Props) => {
  const [formData, setFormData] = useState<User>({
    id: "",
    fullname: "",
    age: 18,
    education: "" as "Grade school" | "High school" | "College",
    gender: "" as "Male" | "Female" | "Other",
    skills: [],
    bio: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const skills = checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value);
        return { ...prev, skills };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.fullname.trim() ||
      !formData.gender.trim() ||
      !formData.education.trim() ||
      !formData.bio.trim()
    ) {
      return "Missing details! Sorry";
    }
    console.log("formData", formData);
    onAdd(formData);

    setFormData({
      id: "",
      fullname: "",
      age: 18,
      education: "" as "Grade school" | "High school" | "College",
      gender: "" as "Male" | "Female" | "Other",
      skills: [],
      bio: "",
    });
  };

  return (
    <div>
      <h3>Add Employee</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          maxWidth: 300,
        }}
      >
        <input
          type="text"
          required
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="fullname"
        />
        <input
          type="number"
          name="age"
          placeholder="age"
          onChange={handleChange}
          value={formData.age}
        />
        <div>
          Gender
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <div>
          Skills
          <label>
            <input
              type="checkbox"
              name="skills"
              value="TypeScript"
              checked={formData.skills.includes("TypeScript")}
              onChange={handleChange}
            />
            TypeScript
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="React"
              checked={formData.skills.includes("React")}
              onChange={handleChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="Node"
              checked={formData.skills.includes("Node")}
              onChange={handleChange}
            />
            Node
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="NoSQL"
              checked={formData.skills.includes("NoSQL")}
              onChange={handleChange}
            />
            NoSQL
          </label>
        </div>

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">Select education</option>
          <option value="Gradeschool"> Grade school</option>
          <option value="HighSchool">high school</option>
          <option value="College">college</option>
        </select>

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          cols={50}
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
