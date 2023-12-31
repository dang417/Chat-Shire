package com.ssafy.backend.domain.chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.chat.dto.NoticeContent;
import com.ssafy.backend.domain.chat.service.NoticeService;
import com.ssafy.backend.domain.common.BasicResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "채팅방 공지", description = "프로젝트 채팅방 공지 관련 API")
@RestController
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeService noticeService;

	@Operation(summary = "내 프로젝트 공지 등록", description = "프로젝트 채팅방 공지를 등록합니다.")
	@PutMapping("/projects/{projectId}/notice")
	public ResponseEntity<BasicResponse> registerMyChatRoom(@RequestBody NoticeContent noticeContent,
			@PathVariable("projectId") Long chatRoomId) {
		noticeService.registerNotification(noticeContent.getContent(), chatRoomId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 공지 등록 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
