import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react'

const QuestionIndex = ({ quiz, questions }) => {
  return (
    <AuthenticatedLayout className="max-w-5xl mx-auto p-6">
      <Head title={`Quiz Questions: ${quiz.title}`} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Questions for "{quiz.title}"</h1>
        <p className="text-gray-600">Total Questions: {questions.length}</p>
      </div>

      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <div key={question.id} className="border rounded-xl p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Q{qIndex + 1}: {question.question}</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Type: {question.type}
              </span>
            </div>

            <ul className="list-disc pl-6 text-gray-700">
              {question.choices.map((choice, cIndex) => (
                <li key={choice.id}>
                  {choice.text}
                  {choice.is_correct && (
                    <span className="ml-2 text-green-600 font-semibold">(Correct)</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/questions/${question.id}/edit`}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </Link>
              <Link
                href={`/questions/${question.id}`}
                method="delete"
                as="button"
                className="text-red-600 hover:underline text-sm"
                onClick={(e) => {
                  if (!confirm('Are you sure you want to delete this question?')) {
                    e.preventDefault();
                  }
                }}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={`/quizzes/${quiz.id}/questions/create`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        >
          + Add Question
        </Link>
      </div>
    </AuthenticatedLayout>
  )
}

export default QuestionIndex