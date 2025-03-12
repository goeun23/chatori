import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ButtonLuna} from './button';
import { expect } from "@storybook/test";

describe('Button 컴포넌트 테스트', () => {
    // 기본 렌더링 테스트
    test("버튼이 올바르게 렌더링 되어야 합니다.", ()=> {
        render(<ButtonLuna>테스트 버튼</ButtonLuna>);

        // 버튼이 문서에 존재하는지 확인
        const buttonElement = screen.getByText('테스트버튼');
        expect(buttonElement).toBeInTheDocument();
    })
});

// 클릭 이벤트 테스트
test("클릭시 onClick 핸들러가 호출되어야 합니다.", () => {
    // 모의 함수 생성
    const handleClick = jest.fn();

    // 버튼 렌더링
    render(<ButtonLuna onClick={handleClick}>클릭하세요</ButtonLuna>);

    // 버튼 찾기 
    const buttonElement = screen.getByText("클릭하세요.");

    // 버튼 클릭 이벤트 발생
    fireEvent.click(buttonElement);

    // 클릭 핸들러가 호출되었는지 확인인
    expect(handleClick).toHaveBeenCalledTimes(1);
})

test('disabled 속성이 true일때 버튼이 비활성화되어야 합니다.', ()=> {
    render(<ButtonLuna>비활성화 버튼</ButtonLuna>);
    const buttonElement = screen.getByText("비활성화 버튼");

    // 버튼이 활성화 되어있는지 확인
    expect(buttonElement).toBeDisabled();
})

// 스타일테스트
test("variant prop에 따라 올바른 클래스가 적용되어야 합니다.", ()=> {
    render(<ButtonLuna variant="primary">기본 버튼</ButtonLuna>);

    const buttonElement = screen.getByText("기본버튼");

    // 버튼에 primary 클래스가 있는지 확인
    // 실제 button 컴포넌트의 구현에 따라 클래스명 수정 필요
    expect(buttonElement).toHaveClass('primary');
})

// 로딩 상태 테스트(button 컴포넌트에 loading prop이 있다고 가정)
test('로딩 상태일 때 로딩 표시가 나타나야 합니다.', ()=> {
    render(<ButtonLuna loading>로딩중</ButtonLuna>);

    // 로딩 인디케이터가 있는지 확인(실제 구현에 따라 수정 필요)
    // 로딩 아이콘이나 텍스트가 있는지 확인 (ex)
    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
})


