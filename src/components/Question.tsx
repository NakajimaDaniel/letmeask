
import { ReactNode } from 'react';
// import '../styles/question.scss'

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,

  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({ content, author, children, isHighlighted = false, isAnswered = false }: QuestionProps) {
  return (
    <div className={`question ${isAnswered ? 'answered'  : '' } ${isHighlighted && !isAnswered ? 'hightlighted' : '' } bg-gray-200 rounded-lg p-6 mt-2 shadow-md mb-5`}>
      <p  className="text-black-400" >{content}</p>
      <footer  className="flex justify-between items-center mt-8" >
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full "
            src={author.avatar} alt={author.name} />
          <span className="ml-2  text-gray-700"  >{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}