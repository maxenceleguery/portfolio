import { useState, useEffect } from 'react';

export function useAge(birthDate: string) {
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const getAge = (birthDate: string) => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    };

    setAge(getAge(birthDate));
  }, [birthDate]);

  return age;
}