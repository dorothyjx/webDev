function ShowWord({
	word,
	isLastAdded,
}) {
	const isAddedClass = isLastAdded ? "word_added" : "";
	return (
		<>
			<label>
				<input
					className="word__toogle"
					data-id={word.id}
					onChange={ (e) => {
						const id = e.target.dataset.id
					}} 
				/>

				<span 
					data-id={word.id}
					className={`word__toogle word_text ${isAddedClass}`}
				>
					{word}
				</span>
			</label>
		</>
	)
}

export default ShowWord;