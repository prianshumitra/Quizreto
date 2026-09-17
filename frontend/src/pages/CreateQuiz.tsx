import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { createQuiz } from '../api/quizzes';
import { createQuestion } from '../api/questions';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface QuestionFormItem {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
}

export const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuestionFormItem[]>([
    {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: 'A',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestionField = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: 'A',
      },
    ]);
  };

  const handleRemoveQuestionField = (index: number) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (
    index: number,
    field: keyof QuestionFormItem,
    value: string
  ) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Quiz title is required.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question_text.trim() || !q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        setError(`Please fill in all question texts and options for Question #${i + 1}.`);
        return;
      }
    }

    setIsLoading(true);
    try {
      // 1. Create Quiz
      const newQuiz = await createQuiz({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      // 2. Add Questions
      for (const q of questions) {
        await createQuestion(newQuiz.id, {
          question_text: q.question_text.trim(),
          option_a: q.option_a.trim(),
          option_b: q.option_b.trim(),
          option_c: q.option_c.trim(),
          option_d: q.option_d.trim(),
          correct_option: q.correct_option,
        });
      }

      navigate('/explore');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to create quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E7DBCC] space-y-2">
        <span className="text-xs font-bold text-[#D3542E] uppercase tracking-wider bg-[#FDF1ED] px-3 py-1 rounded-full border border-[#D3542E]/20 inline-block">
          Creator Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F2D3D]">
          Create a New Quiz
        </h1>
        <p className="text-xs sm:text-sm text-[#1F2937]/70">
          Build custom assessment quizzes with questions and multiple choices.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Basic Details */}
        <Card className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">1. Quiz Info</h3>
          <Input
            label="Quiz Title"
            type="text"
            placeholder="e.g. Indian Freedom Struggle & Landmarks"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2D3D]">
              Description (Category / Summary)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. History assessment covering 1857 revolt to 1947 independence movement."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#FFFDF9] border border-[#E7DBCC] text-[#1F2937] placeholder-[#1F2937]/40 text-sm rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#D3542E]"
            />
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">
              2. Add Questions ({questions.length})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<PlusCircle className="w-4 h-4" />}
              onClick={handleAddQuestionField}
            >
              Add Question
            </Button>
          </div>

          {questions.map((q, idx) => (
            <Card key={idx} className="space-y-4 relative bg-[#FFFDF9] border border-[#E7DBCC]">
              <div className="flex items-center justify-between border-b border-[#E7DBCC]/60 pb-3">
                <span className="font-serif text-base font-bold text-[#D3542E]">
                  Question #{idx + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestionField(idx)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Input
                label="Question Text"
                type="text"
                placeholder="e.g. Who was the first Governor-General of independent India?"
                value={q.question_text}
                onChange={(e) => handleQuestionChange(idx, 'question_text', e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Input
                  label="Option A"
                  type="text"
                  placeholder="Option A content"
                  value={q.option_a}
                  onChange={(e) => handleQuestionChange(idx, 'option_a', e.target.value)}
                  required
                />
                <Input
                  label="Option B"
                  type="text"
                  placeholder="Option B content"
                  value={q.option_b}
                  onChange={(e) => handleQuestionChange(idx, 'option_b', e.target.value)}
                  required
                />
                <Input
                  label="Option C"
                  type="text"
                  placeholder="Option C content"
                  value={q.option_c}
                  onChange={(e) => handleQuestionChange(idx, 'option_c', e.target.value)}
                  required
                />
                <Input
                  label="Option D"
                  type="text"
                  placeholder="Option D content"
                  value={q.option_d}
                  onChange={(e) => handleQuestionChange(idx, 'option_d', e.target.value)}
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#0F2D3D]">
                  Correct Option:
                </label>
                <div className="flex items-center gap-3">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold">
                      <input
                        type="radio"
                        name={`correct_opt_${idx}`}
                        value={opt}
                        checked={q.correct_option === opt}
                        onChange={() => handleQuestionChange(idx, 'correct_option', opt)}
                        className="text-[#D3542E] focus:ring-[#D3542E]"
                      />
                      <span>Option {opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/explore')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} icon={<CheckCircle className="w-5 h-5" />}>
            Publish Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};
