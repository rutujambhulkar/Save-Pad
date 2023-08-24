import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import NoteList from './Components/NoteList';
import SearchNote from './Components/SearchNote';


const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: 'dd/mm/yyyy',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: 'dd/mm/yyyy',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: 'dd/mm/yyyy',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: 'dd/mm/yyyy',
		},
	]);

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<SearchNote handleSearchNote={setSearchText} />
				<NoteList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;
