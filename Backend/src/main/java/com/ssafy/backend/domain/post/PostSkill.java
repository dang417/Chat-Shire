package com.ssafy.backend.domain.post;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.Skill;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class PostSkill extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POSTSKILL_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "SKILL_ID")
    private Skill skill;


}
