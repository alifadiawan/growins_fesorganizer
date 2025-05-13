import React from 'react';

export default function QuizResult({ quiz, questions, studentAnswers }) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Quiz Result: {quiz.title}</h1>

            {questions.map((question, index) => {
                const selectedChoices = studentAnswers?.[question.id]?.map(a => a.choice_id) || [];

                return (
                    <div key={question.id} className="mb-8 border-b pb-4">
                        <h2 className="font-semibold text-lg mb-2">
                            {index + 1}. {question.question}
                        </h2>

                        <ul className="space-y-2">
                            {question.choices.map((choice) => {
                                const isCorrect = choice.is_correct;
                                const isSelected = selectedChoices.includes(choice.id);

                                return (
                                    <li
                                        key={choice.id}
                                        className={`p-3 border rounded flex items-center justify-between ${isCorrect
                                                ? 'bg-green-100 border-green-400'
                                                : isSelected
                                                    ? 'bg-red-100 border-red-400'
                                                    : 'bg-white'
                                            }`}
                                    >
                                        <span>{choice.text}</span>

                                        <div className="text-sm text-gray-600">
                                            {isCorrect && <span className="text-green-600">(Correct)</span>}
                                            {isSelected && !isCorrect && <span className="text-red-600 ml-2">(Your answer)</span>}
                                            {isSelected && isCorrect && <span className="text-green-600 ml-2">(You got it!)</span>}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
