import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

export default function QuestionCreate({ quiz }) {
    const { errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        question: '',
        type: 'single',
        choices: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
        ],
    });

    const handleChoiceChange = (index, field, value) => {
        const updated = [...data.choices];
        if (field === 'is_correct') {
            updated[index][field] = value.target.checked;
        } else {
            updated[index][field] = value;
        }
        setData('choices', updated);
    };

    const addChoice = () => {
        setData('choices', [...data.choices, { text: '', is_correct: false }]);
    };

    const removeChoice = (index) => {
        const updated = [...data.choices];
        updated.splice(index, 1);
        setData('choices', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('quiz.store',{quiz: quiz.id}));
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Create Question for: {quiz.title}</h2>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block font-semibold">Question Text</label>
                    <textarea
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                    {errors.question && <div className="text-red-500 text-sm">{errors.question}</div>}
                </div>

                <div>
                    <label className="block font-semibold">Type</label>
                    <select
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                    >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Choices</label>
                    {data.choices.map((choice, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2">
                            <input
                                type="text"
                                placeholder={`Choice ${index + 1}`}
                                value={choice.text}
                                onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                                className="flex-1 border px-3 py-2 rounded"
                            />
                            <label className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={choice.is_correct}
                                    onChange={(e) => handleChoiceChange(index, 'is_correct', e)}
                                />
                                Correct
                            </label>
                            {data.choices.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeChoice(index)}
                                    className="text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addChoice}
                        className="text-blue-600 text-sm mt-2"
                    >
                        + Add Choice
                    </button>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Save Question
                    </button>
                </div>
            </form>
        </div>
    );
}
