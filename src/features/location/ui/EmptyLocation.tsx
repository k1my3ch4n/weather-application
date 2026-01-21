interface EmptyLocationProps {
  onSearchClick: () => void;
}

export const EmptyLocation = ({ onSearchClick }: EmptyLocationProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-gray-500 mb-4">
        위치 정보를 가져올 수 없어 해당 장소의 날씨 정보가 제공되지 않습니다.
      </p>
      <button
        onClick={onSearchClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        위치 검색하기
      </button>
    </div>
  );
};
