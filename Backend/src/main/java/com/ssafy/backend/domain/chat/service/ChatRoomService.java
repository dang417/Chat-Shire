package com.ssafy.backend.domain.chat.service;

import static com.ssafy.backend.domain.common.GlobalMethod.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoDetailResponse;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoResponse;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.chat.entity.Participation;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.chat.repository.ParticipationRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final ParticipationRepository participationRepository;
	private final UserRepository userRepository;
	private final NotificationRepository notificationRepository;

	public List<ChatRoomInfoResponse> getMyChatRoom() {
		List<ChatRoom> chatRooms = participationRepository.findByUserId(getUserId()).stream()
				.map(Participation::getChatRoom)
				.collect(Collectors.toList());
		return ChatRoomInfoResponse.fromEntityList(chatRooms);
	}

	public ChatRoomInfoDetailResponse getMyChatRoomDetail(Long chatRoomId) {
		ChatRoom chatRoom = participationRepository.findByUserIdAndChatRoomId(getUserId(), chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Participation.getChatRoom", chatRoomId))
				.getChatRoom();

		String content = notificationRepository.findByChatRoomId(chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification.getChatRoom", chatRoomId)).getContent();

		return ChatRoomInfoDetailResponse.toDto(chatRoom, content);
	}

	@Transactional
	public void registerMyChatRoom(ChatRoomInfo chatRoomInfo) {

		User user = userRepository.findById(getUserId())
				.orElseThrow(UserNotFoundException::new);
		ChatRoom savedChatRoom = chatRoomRepository.save(chatRoomInfo.toEntity());

		notificationRepository.save(Notification.create(savedChatRoom));
		participationRepository.save(Participation.create(user, savedChatRoom));
	}

	@Transactional
	public void modifyMyChatRoom(ChatRoomInfo chatRoomInfo, Long chatRoomId) {
		ChatRoom chatRoom = participationRepository.findByUserIdAndChatRoomId(getUserId(), chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Participation.getCharRoom", chatRoomId))
				.getChatRoom();

		chatRoom.update(chatRoomInfo);
	}

	@Transactional
	public void deleteMyChatRoom(Long chatRoomId) {
		participationRepository.deleteByUserIdAndChatRoomId(getUserId(), chatRoomId);
	}
}