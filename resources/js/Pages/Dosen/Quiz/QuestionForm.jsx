import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'

const QuestionForm = ({ quiz, question = null }) => {
    const isEdit = !!question;

    const { data, setData, post, put, processing, errors } = useForm({
        question: question?.question || '',
        type: question?.type || 'single',
        choices: question?.choices || [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
        ],
    });

    const handleChoiceChange = (index, field, value) => {
        const updated = [...data.choices];
        updated[index][field] = field === 'is_correct' ? value.target.checked : value;
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isEdit
            ? `/questions/${question.id}`
            : `/quizzes/${quiz.id}/questions`;

        const method = isEdit ? put : post;

        method(url, {
            onSuccess: () => {
                router.visit(`/quizzes/${quiz.id}/questions`);
            },
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Head title={isEdit ? 'Edit Question' : 'Create Question'} />

            <h1 className="text-2xl font-bold mb-6">
                {isEdit ? 'Edit Question' : 'Create New Question'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Question Text</label>
                    <input
                        type="text"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        className="w-full mt-1 border px-3 py-2 rounded"
                    />
                    {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                </div>

                <div>
                    <label className="block font-medium">Question Type</label>
                    <select
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        className="w-full mt-1 border px-3 py-2 rounded"
                    >
                        <option value="single">Single Choice</option>
                        <option value="multiple">Multiple Choice</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">Choices</label>

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
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addChoice}
                        className="text-blue-600 hover:underline text-sm mt-2"
                    >
                        + Add Choice
                    </button>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                    >
                        {isEdit ? 'Update Question' : 'Create Question'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default QuestionForm