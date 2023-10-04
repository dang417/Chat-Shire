package com.ssafy.backend.domain.link.dto;

import com.ssafy.backend.domain.link.Link;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkInfoResponse {
    private Long linkId;
    private Long userId;
    private String content;

    public static LinkInfoResponse fromEntity(Link link) {
        return LinkInfoResponse.builder()
                .linkId(link.getId())
                .userId(link.getUserId())
                .content(link.getContent()).build();
    }
}
