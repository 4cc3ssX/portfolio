import { db } from "@/firebase/config";
import { IAboutMe, IContact, IExperience, IMe, IProject } from "@/types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function getIntro(): Promise<IMe> {
  const docSnapshot = await getDoc(doc(db, "intro", "me"));
  return docSnapshot.data() as IMe;
}

export async function getAbout(): Promise<IAboutMe> {
  const docSnapshot = await getDoc(doc(db, "about", "me"));
  return docSnapshot.data() as IAboutMe;
}

export async function getExperience(): Promise<IExperience[]> {
  const docSnapshot = await getDocs(collection(db, "experience"));

  return docSnapshot.docs.map((doc) => {
    const experience = doc.data();
    const fromDate = experience.from.toDate() as Date;
    const toDate = experience.to.toDate() as Date;
    return {
      ...experience,
      from: fromDate.getTime(),
      to: toDate.getTime(),
    } as IExperience;
  });
}

export async function getProjects(): Promise<IProject[]> {
  const docSnapshot = await getDocs(collection(db, "projects"));

  return docSnapshot.docs.map((doc) => {
    const project = doc.data();
    const fromDate = project.from.toDate() as Date;
    const toDate = project.to.toDate() as Date;
    return {
      ...project,
      from: fromDate.getTime(),
      to: toDate.getTime(),
    } as IProject;
  });
}

export async function getContact(): Promise<IContact> {
  const docSnapshot = await getDoc(doc(db, "contact", "me"));
  return docSnapshot.data() as IContact;
}

export async function getData() {
  return Promise.all([
    getIntro(),
    getAbout(),
    getExperience(),
    getProjects(),
    getContact(),
  ]).then(([intro, about, experience, projects, contact]) => ({
    intro,
    about,
    experience,
    projects,
    contact,
  }));
}
