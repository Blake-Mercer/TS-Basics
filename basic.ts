import { Person } from "./third-party"


type PersonContactInfo = Person['contactInfo']
type NameOrAge = Person['age' | 'name']
type PersonName = Person['age']

function updateContactInfo(name: PersonName, contactInfo: PersonContactInfo) {

}

type PersonProps = keyof Person;


