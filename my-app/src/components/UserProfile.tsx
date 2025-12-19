import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import type { User } from "../types/user";

type Props = {
  user: User;
  onUpdate: (user: User) => void;
};

const UserProfile = ({ user, onUpdate }: Props) => {
  const [formData, setFormData] = useState<User>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

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
    onUpdate(formData);
  };

  return (
    <div>
      <h3>View / Edit User</h3>
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
          placeholder="Full name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
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
          {["TypeScript", "React", "Node", "NoSQL"].map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={handleChange}
              />
              {skill}
            </label>
          ))}
        </div>

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
        >
          <option value="">Select education</option>
          <option value="Gradeschool">Grade school</option>
          <option value="HighSchool">High school</option>
          <option value="College">College</option>
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

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UserProfile;
