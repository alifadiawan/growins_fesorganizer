import Toast from '@/Components/Toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TakeQuiz({ quiz, hasAnswered }) {
    const [toastMessage, setToastMessage] = useState({ success: '', error: '' });
    const { data, setData, post, processing, errors } = useForm({
        answers: {},
    });

    const handleChange = (questionId, choiceId, type) => {
        setData((prev) => {
            const updated = { ...prev.answers };

            if (type === 'multiple') {
                updated[questionId] = updated[questionId] || [];
                if (updated[questionId].includes(choiceId)) {
                    updated[questionId] = updated[questionId].filter((id) => id !== choiceId);
                } else {
                    updated[questionId].push(choiceId);
                }
            } else {
                updated[questionId] = [choiceId];
            }

            return { ...prev, answers: updated };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.student.quiz.submit', { quiz: quiz.id }), {
            onSuccess: (response) => {
                setToastMessage({ success: 'Quiz submitted successfully!', error: '' });
            },
            onError: (errorBag) => {
                const errorMessage = errorBag?.message || 'Something went wrong.';
                setToastMessage({ success: '', error: 'Something went wrong.' });
            },
        });
    };

    return (
        <AuthenticatedLayout >
            <Toast success={toastMessage.success} error={toastMessage.error} />

            <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {quiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="p-4 border rounded space-y-2">
                        <div className="font-semibold">{qIndex + 1}. {question.question}</div>

                        <div className="space-y-1">
                            {question.choices.map((choice) => {
                                const isChecked = (data.answers[question.id] || []).includes(choice.id);

                                return (
                                    <label key={choice.id} className="block text-sm cursor-pointer">
                                        <input
                                            type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                                            name={`question-${question.id}`}
                                            value={choice.id}
                                            checked={isChecked}
                                            onChange={() => handleChange(question.id, choice.id, question.type)}
                                            className="mr-2"
                                        />
                                        {choice.text}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {errors.answers && (
                    <div className="text-red-500 text-sm">{errors.answers}</div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Quiz
                </button>
                {hasAnswered ? (
                    <Link
                        href={route('user.student.quiz.result', { quiz: quiz.id })}
                        className="border border-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 hover:text-white"
                    >
                        See Result
                    </Link>
                ) : (
                    <span className="text-sm text-gray-500 italic">Take the quiz first to see the result</span>
                )}

            </form>
        </AuthenticatedLayout>
    );
}
