import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { createQuiz } from '../api/quizzes';
import { createQuestion } from '../api/questions';
import { Input } from '../components/ui/Input';
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
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#3A1F25] p-6 sm:p-7 rounded-3xl border border-[#D6A24A]/25 space-y-2.5 shadow-[0_12px_35px_rgba(20,8,12,0.35)]">
        <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-widest bg-[#D6A24A]/10 px-3 py-1 rounded-full border border-[#D6A24A]/30 inline-block">
          Creator Studio
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F5EBDD]">
          Create a New Quiz
        </h1>
        <p className="text-xs sm:text-sm text-[#F5EBDD]/75">
          Build custom assessment quizzes with questions and multiple choices.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/40 text-[#F5EBDD] text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#D6A24A]" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Basic Details */}
        <Card className="space-y-4 bg-[#3A1F25] border border-[#D6A24A]/25">
          <h3 className="font-serif text-xl font-bold text-[#F5EBDD]">1. Quiz Info</h3>
          <Input
            label="Quiz Title"
            type="text"
            placeholder="e.g. Indian Freedom Struggle & Landmarks"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6A24A]">
              Description (Category / Summary)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. History assessment covering 1857 revolt to 1947 independence movement."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#321B22] border border-[#D6A24A]/25 text-[#F5EBDD] placeholder-[#F5EBDD]/40 text-sm rounded-xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#D6A24A]"
            />
          </div>
        </Card>

        {/* Questions List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#F5EBDD]">
              2. Add Questions ({questions.length})
            </h3>
            <button
              type="button"
              onClick={handleAddQuestionField}
              className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-[#D6A24A]/40 text-[#D6A24A] hover:bg-[#D6A24A]/10 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

          {questions.map((q, idx) => (
            <Card key={idx} className="space-y-4 relative bg-[#3A1F25] border border-[#D6A24A]/25">
              <div className="flex items-center justify-between border-b border-[#F5EBDD]/10 pb-3">
                <span className="font-serif text-base font-bold text-[#D6A24A]">
                  Question #{idx + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestionField(idx)}
                    className="text-[#D6A24A] hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
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
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#D6A24A]">
                  Correct Option:
                </label>
                <div className="flex items-center gap-4">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#F5EBDD]">
                      <input
                        type="radio"
                        name={`correct_opt_${idx}`}
                        value={opt}
                        checked={q.correct_option === opt}
                        onChange={() => handleQuestionChange(idx, 'correct_option', opt)}
                        className="accent-[#D6A24A] w-4 h-4 focus:ring-[#D6A24A]"
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
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-7 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
            style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isLoading ? 'Publishing...' : 'Publish Quiz'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
