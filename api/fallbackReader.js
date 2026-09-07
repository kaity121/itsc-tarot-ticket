const FALLBACK_INTERPRETATIONS = {
  "The Fool": {
    summary: {
      en: "Stepping into something new with curiosity, openness, and a willingness to learn.",
      vi: "Bước vào điều mới với sự tò mò, cởi mở và tinh thần sẵn sàng học hỏi.",
    },
    perspective: {
      en: "What looks like uncertainty may actually be the beginning of a more authentic direction.",
      vi: "Điều trông như sự bất định đôi khi lại là khởi đầu của một hướng đi chân thật hơn.",
    },
    advice: {
      en: "Take one honest step forward without demanding complete certainty first.",
      vi: "Hãy bước một bước chân thật về phía trước mà không cần đòi hỏi mọi thứ phải chắc chắn ngay từ đầu.",
    },
  },

  "The Magician": {
    summary: {
      en: "Your existing skills, attention, and resources can be brought together with purpose.",
      vi: "Những kỹ năng, sự tập trung và nguồn lực bạn đang có có thể được kết nối thành một hướng đi rõ ràng.",
    },
    perspective: {
      en: "The situation may seem to require something you do not have, while much of what you need is already within reach.",
      vi: "Tình huống có thể khiến bạn nghĩ mình còn thiếu điều gì đó, trong khi phần lớn thứ cần thiết đã ở ngay trong tầm tay.",
    },
    advice: {
      en: "Work with what is already available and turn intention into one concrete action.",
      vi: "Hãy tận dụng những gì đang có và biến ý định thành một hành động cụ thể.",
    },
  },

  "The High Priestess": {
    summary: {
      en: "Quiet observation and inner awareness are more useful than rushing toward an answer.",
      vi: "Sự quan sát tĩnh lặng và lắng nghe bên trong có thể hữu ích hơn việc vội vàng tìm một câu trả lời.",
    },
    perspective: {
      en: "Stillness does not mean nothing is happening; understanding may be forming beneath the surface.",
      vi: "Sự im lặng không có nghĩa là không có gì đang diễn ra; có thể một sự hiểu biết mới đang hình thành bên dưới bề mặt.",
    },
    advice: {
      en: "Pause before reacting and give yourself room to notice what feels quietly true.",
      vi: "Hãy dừng lại trước khi phản ứng và cho mình không gian để nhận ra điều gì đang âm thầm chân thật.",
    },
  },

  "The Empress": {
    summary: {
      en: "Growth comes through care, patience, nourishment, and allowing something meaningful to develop.",
      vi: "Sự phát triển đến từ chăm sóc, kiên nhẫn và cho phép điều có ý nghĩa được lớn lên tự nhiên.",
    },
    perspective: {
      en: "Progress may feel gradual, but consistent care can create momentum that is easy to overlook day by day.",
      vi: "Tiến triển có thể diễn ra từ từ, nhưng sự chăm sóc đều đặn tạo nên động lực mà ta dễ bỏ qua trong từng ngày.",
    },
    advice: {
      en: "Give more attention to what genuinely restores and supports you.",
      vi: "Hãy dành nhiều sự chú ý hơn cho những điều thực sự nuôi dưỡng và nâng đỡ bạn.",
    },
  },

  "The Emperor": {
    summary: {
      en: "Structure, boundaries, and clear priorities can create a steadier foundation.",
      vi: "Cấu trúc, ranh giới và những ưu tiên rõ ràng có thể tạo nên một nền tảng vững vàng hơn.",
    },
    perspective: {
      en: "Boundaries are not necessarily restrictions; they can protect the space you need to act with intention.",
      vi: "Ranh giới không nhất thiết là sự giới hạn; chúng có thể bảo vệ không gian cần thiết để bạn hành động có chủ đích.",
    },
    advice: {
      en: "Clarify what deserves your time and establish one boundary that supports it.",
      vi: "Hãy xác định điều xứng đáng với thời gian của bạn và thiết lập một ranh giới để bảo vệ điều đó.",
    },
  },

  "The Hierophant": {
    summary: {
      en: "Shared knowledge, established practices, and trusted guidance can offer useful grounding.",
      vi: "Tri thức được chia sẻ, những phương pháp đã được kiểm chứng và sự hướng dẫn đáng tin có thể đem lại điểm tựa hữu ích.",
    },
    perspective: {
      en: "Following a proven framework can be a starting point rather than a permanent limitation.",
      vi: "Một khuôn khổ đã được kiểm chứng có thể là điểm khởi đầu chứ không nhất thiết là giới hạn vĩnh viễn.",
    },
    advice: {
      en: "Learn from what has worked before, then decide consciously what fits your own path.",
      vi: "Hãy học từ những điều từng hiệu quả, rồi chủ động chọn điều phù hợp với con đường của riêng mình.",
    },
  },

  "The Lovers": {
    summary: {
      en: "This card highlights conscious choice, values, connection, and alignment.",
      vi: "Lá bài này nhấn mạnh sự lựa chọn có ý thức, giá trị cá nhân, kết nối và sự đồng điệu.",
    },
    perspective: {
      en: "A difficult choice may be less about finding the perfect option and more about understanding what you truly value.",
      vi: "Một lựa chọn khó có thể không nằm ở việc tìm phương án hoàn hảo, mà ở việc hiểu điều gì thực sự quan trọng với bạn.",
    },
    advice: {
      en: "Choose the direction that is most honest with your deeper values.",
      vi: "Hãy chọn hướng đi thành thật nhất với những giá trị sâu bên trong bạn.",
    },
  },

  "The Chariot": {
    summary: {
      en: "Focused intention can help you move forward despite competing pressures.",
      vi: "Một ý định rõ ràng có thể giúp bạn tiến về phía trước dù đang có nhiều lực kéo khác nhau.",
    },
    perspective: {
      en: "Internal tension does not always mean you are off course; it can reveal where your priorities need alignment.",
      vi: "Sự giằng co bên trong không nhất thiết có nghĩa bạn đang đi sai hướng; nó có thể cho thấy nơi các ưu tiên cần được cân bằng.",
    },
    advice: {
      en: "Choose your direction deliberately and avoid giving every distraction equal weight.",
      vi: "Hãy chủ động chọn hướng đi và đừng trao cho mọi sự xao nhãng cùng một mức độ quan trọng.",
    },
  },

  "Strength": {
    summary: {
      en: "Gentleness, patience, and emotional steadiness can be forms of real strength.",
      vi: "Sự dịu dàng, kiên nhẫn và vững vàng về cảm xúc cũng là những dạng sức mạnh thực sự.",
    },
    perspective: {
      en: "You may not need to overpower the situation; responding calmly can change the dynamic more effectively.",
      vi: "Bạn có thể không cần áp đảo tình huống; một phản ứng bình tĩnh đôi khi thay đổi được cả cục diện.",
    },
    advice: {
      en: "Lead with patience rather than force, especially where emotions are involved.",
      vi: "Hãy dẫn dắt bằng sự kiên nhẫn thay vì sức ép, đặc biệt khi cảm xúc đang hiện diện.",
    },
  },

  "The Hermit": {
    summary: {
      en: "Stepping back can create the space needed for honest reflection and recalibration.",
      vi: "Lùi lại một bước có thể tạo ra không gian cần thiết để nhìn lại và điều chỉnh hướng đi.",
    },
    perspective: {
      en: "Solitude is not necessarily withdrawal; sometimes distance helps you hear your own perspective more clearly.",
      vi: "Ở một mình không nhất thiết là thu mình; đôi khi khoảng cách giúp bạn nghe rõ tiếng nói của chính mình hơn.",
    },
    advice: {
      en: "Reduce unnecessary noise and spend some intentional time listening to yourself.",
      vi: "Hãy giảm bớt những ồn ào không cần thiết và dành một khoảng thời gian có chủ đích để lắng nghe bản thân.",
    },
  },

  "Wheel of Fortune": {
    summary: {
      en: "Change, cycles, and shifting circumstances are part of the current landscape.",
      vi: "Thay đổi, chu kỳ và những hoàn cảnh dịch chuyển đang là một phần của bức tranh hiện tại.",
    },
    perspective: {
      en: "Not every variable can be controlled, but your response to changing conditions remains within your agency.",
      vi: "Không phải biến số nào cũng có thể kiểm soát, nhưng cách bạn phản ứng trước thay đổi vẫn nằm trong quyền lựa chọn của mình.",
    },
    advice: {
      en: "Stay adaptable and focus your energy on what you can actually influence.",
      vi: "Hãy giữ sự linh hoạt và tập trung năng lượng vào những điều bạn thực sự có thể tác động.",
    },
  },

  "Justice": {
    summary: {
      en: "Clarity comes from looking honestly at facts, choices, boundaries, and consequences.",
      vi: "Sự sáng rõ đến từ việc thành thật nhìn vào sự thật, lựa chọn, ranh giới và hệ quả.",
    },
    perspective: {
      en: "A situation may become easier to understand when emotional assumptions are separated from observable reality.",
      vi: "Một tình huống có thể trở nên dễ hiểu hơn khi những giả định cảm xúc được tách khỏi thực tế có thể quan sát.",
    },
    advice: {
      en: "Look at the situation as honestly and fairly as you can before deciding your next step.",
      vi: "Hãy nhìn tình huống một cách thành thật và công bằng nhất có thể trước khi quyết định bước tiếp theo.",
    },
  },

  "The Hanged Man": {
    summary: {
      en: "A pause can create a different perspective and loosen the need to force an immediate result.",
      vi: "Một khoảng dừng có thể mở ra góc nhìn khác và giúp bạn bớt nhu cầu phải ép mọi thứ có kết quả ngay lập tức.",
    },
    perspective: {
      en: "What feels like stagnation may contain information that becomes visible only when you stop pushing.",
      vi: "Điều giống như trì trệ đôi khi chứa đựng những thông tin chỉ hiện ra khi bạn ngừng cố đẩy mọi thứ tiến lên.",
    },
    advice: {
      en: "Pause, reconsider the situation from another angle, and allow timing to become part of the process.",
      vi: "Hãy dừng lại, nhìn tình huống từ một góc khác và cho phép thời điểm cũng trở thành một phần của quá trình.",
    },
  },

  "Death": {
    summary: {
      en: "Transformation asks you to recognize what has completed its role and make room for something new.",
      vi: "Sự chuyển hóa mời bạn nhận ra điều gì đã hoàn thành vai trò của nó và tạo không gian cho điều mới.",
    },
    perspective: {
      en: "An ending does not have to mean failure; it can mark the point where an old pattern is ready to change.",
      vi: "Một kết thúc không nhất thiết là thất bại; nó có thể đánh dấu lúc một khuôn mẫu cũ đã sẵn sàng thay đổi.",
    },
    advice: {
      en: "Release what you already know is no longer supporting the person you are becoming.",
      vi: "Hãy buông điều mà bạn đã biết không còn nâng đỡ con người mình đang trở thành.",
    },
  },

  "Temperance": {
    summary: {
      en: "Balance, patience, and thoughtful integration can create sustainable progress.",
      vi: "Sự cân bằng, kiên nhẫn và khả năng dung hòa có thể tạo nên tiến triển bền vững.",
    },
    perspective: {
      en: "The most useful answer may not be at either extreme; it may emerge by combining what works from both sides.",
      vi: "Câu trả lời hữu ích nhất có thể không nằm ở một trong hai cực, mà xuất hiện khi bạn dung hòa điều tốt từ cả hai phía.",
    },
    advice: {
      en: "Move gradually and look for a rhythm that balances ambition with restoration.",
      vi: "Hãy tiến từng bước và tìm một nhịp độ cân bằng giữa tham vọng và sự hồi phục.",
    },
  },

  "The Devil": {
    summary: {
      en: "Awareness of attachment, habits, and self-imposed limitations can restore a sense of choice.",
      vi: "Nhận diện sự bám chấp, thói quen và những giới hạn do chính mình tạo ra có thể khôi phục cảm giác được lựa chọn.",
    },
    perspective: {
      en: "Something that feels impossible to change may become more workable once the pattern is seen clearly.",
      vi: "Điều tưởng như không thể thay đổi có thể trở nên dễ xử lý hơn khi khuôn mẫu được nhìn thấy rõ ràng.",
    },
    advice: {
      en: "Notice where comfort has become a constraint and identify one small way to reclaim your agency.",
      vi: "Hãy nhận ra nơi sự quen thuộc đã trở thành giới hạn và tìm một cách nhỏ để lấy lại quyền chủ động.",
    },
  },

  "The Tower": {
    summary: {
      en: "A disruption can expose assumptions or structures that were no longer stable.",
      vi: "Một sự xáo trộn có thể làm lộ ra những giả định hoặc cấu trúc vốn đã không còn vững chắc.",
    },
    perspective: {
      en: "A sudden change can feel unsettling while also creating an opportunity to rebuild with greater honesty.",
      vi: "Một thay đổi bất ngờ có thể khiến bạn chao đảo, nhưng đồng thời cũng mở ra cơ hội xây dựng lại chân thật hơn.",
    },
    advice: {
      en: "Instead of trying to preserve every old assumption, ask what the change is helping you see more clearly.",
      vi: "Thay vì cố giữ mọi giả định cũ, hãy hỏi sự thay đổi này đang giúp bạn nhìn rõ điều gì hơn.",
    },
  },

  "The Star": {
    summary: {
      en: "Hope, renewal, and quiet trust can return after a demanding period.",
      vi: "Hy vọng, sự hồi phục và niềm tin lặng lẽ có thể trở lại sau một giai đoạn nhiều thử thách.",
    },
    perspective: {
      en: "Progress does not need to be dramatic to be meaningful; small signs of renewal can matter.",
      vi: "Tiến triển không cần phải lớn lao mới có ý nghĩa; những dấu hiệu hồi phục nhỏ bé cũng rất đáng trân trọng.",
    },
    advice: {
      en: "Protect the small sources of hope and let them guide one realistic next step.",
      vi: "Hãy bảo vệ những nguồn hy vọng nhỏ bé và để chúng dẫn bạn tới một bước tiếp theo thực tế.",
    },
  },

  "The Moon": {
    summary: {
      en: "Uncertainty can blur perception, making it important to distinguish intuition from fear and assumption.",
      vi: "Sự bất định có thể làm mờ nhận thức, vì vậy điều quan trọng là phân biệt trực giác với nỗi sợ và giả định.",
    },
    perspective: {
      en: "Not everything you imagine in an uncertain moment represents what is actually happening.",
      vi: "Không phải mọi điều bạn hình dung trong một khoảnh khắc bất định đều phản ánh đúng những gì đang diễn ra.",
    },
    advice: {
      en: "Give yourself time and seek clearer information before treating a fear as a fact.",
      vi: "Hãy cho mình thời gian và tìm thêm thông tin rõ ràng trước khi xem một nỗi sợ như một sự thật.",
    },
  },

  "The Sun": {
    summary: {
      en: "Clarity, vitality, openness, and genuine enjoyment are available when you allow yourself to see what is working.",
      vi: "Sự sáng rõ, sức sống, cởi mở và niềm vui chân thật có thể xuất hiện khi bạn cho phép mình nhìn vào những điều đang tốt đẹp.",
    },
    perspective: {
      en: "Joy does not need to be justified; recognizing what is going well can strengthen your sense of direction.",
      vi: "Niềm vui không cần phải được biện minh; nhận ra điều đang tốt có thể củng cố cảm giác phương hướng.",
    },
    advice: {
      en: "Let yourself acknowledge what is going right instead of focusing only on what remains unresolved.",
      vi: "Hãy cho phép mình ghi nhận những điều đang tốt thay vì chỉ tập trung vào những gì còn dang dở.",
    },
  },

  "Judgement": {
    summary: {
      en: "Reflection, forgiveness, and a clearer understanding of the past can support a meaningful next decision.",
      vi: "Chiêm nghiệm, tha thứ và hiểu rõ hơn về quá khứ có thể nâng đỡ một quyết định mới có ý nghĩa.",
    },
    perspective: {
      en: "Past experiences can become useful information without becoming a permanent definition of who you are.",
      vi: "Những trải nghiệm trong quá khứ có thể trở thành thông tin hữu ích mà không cần trở thành định nghĩa vĩnh viễn về con người bạn.",
    },
    advice: {
      en: "Take the lesson forward while allowing yourself to outgrow the version of you that needed it.",
      vi: "Hãy mang bài học đi cùng nhưng cũng cho phép mình trưởng thành vượt khỏi phiên bản đã từng cần bài học ấy.",
    },
  },

  "The World": {
    summary: {
      en: "Completion, integration, and recognition of how far you have come are central themes.",
      vi: "Sự hoàn tất, tích hợp và nhận ra mình đã đi xa đến đâu là những chủ đề nổi bật.",
    },
    perspective: {
      en: "An ending can be less about closing a door and more about recognizing what you have learned and become.",
      vi: "Một kết thúc có thể không chỉ là khép lại một cánh cửa, mà còn là nhận ra những gì bạn đã học và đã trở thành.",
    },
    advice: {
      en: "Acknowledge your progress and carry the lessons that genuinely belong in the next chapter.",
      vi: "Hãy ghi nhận hành trình của mình và mang theo những bài học thực sự cần thiết cho chương tiếp theo.",
    },
  },
};

function getFallbackCardInfo(cardName, language) {
  const info = FALLBACK_INTERPRETATIONS[cardName];

  if (info) {
    return {
      summary: info.summary[language],
      perspective: info.perspective[language],
      advice: info.advice[language],
    };
  }

  return {
    summary:
      language === "vi"
        ? "Một lời mời chậm lại để nhìn rõ hơn điều đang diễn ra bên trong."
        : "A quiet invitation to slow down and notice what is happening within.",
    perspective:
      language === "vi"
        ? "Điều quan trọng có thể nằm sâu hơn những gì đang xuất hiện ở bề mặt."
        : "What matters may be deeper than what is immediately visible on the surface.",
    advice:
      language === "vi"
        ? "Hãy tiến từng bước tỉnh thức mà không cần chờ sự chắc chắn tuyệt đối."
        : "Take one mindful step forward without waiting for absolute certainty.",
  };
}

function getPositionLabel(position, language, index) {
  if (position) return position;

  if (language === "vi") {
    return ["Cội nguồn quá khứ", "Thực tại hiện diện", "Chiều hướng tương lai"][
      index
    ] || `Vị trí ${index + 1}`;
  }

  return (
    ["Past Foundation", "Present Reality", "Future Trajectory"][index] ||
    `Position ${index + 1}`
  );
}

export function generateFallbackReading({
  cards = [],
  spreadType = "daily",
  perspectives = [],
  language = "en",
}) {
  const normalizedLanguage = language === "vi" ? "vi" : "en";

  const fallbackCards = cards.map((card, index) => {
    const cardName =
      typeof card === "string"
        ? card
        : card?.name || `Card ${index + 1}`;

    const position =
      typeof card === "object" && card?.position
        ? card.position
        : perspectives[index]?.label;

    const info = getFallbackCardInfo(cardName, normalizedLanguage);

    let reflection;

    if (spreadType === "daily" && perspectives[index]?.label) {
      reflection =
        normalizedLanguage === "vi"
          ? `${perspectives[index].label}: ${info.perspective}`
          : `${perspectives[index].label}: ${info.perspective}`;
    } else if (spreadType === "classic") {
      reflection = `${info.summary} ${info.perspective}`;
    } else {
      reflection = `${info.summary} ${info.perspective}`;
    }

    return {
      name: cardName,
      position: getPositionLabel(position, normalizedLanguage, index),
      reflection,
    };
  });

  const firstName = fallbackCards[0]?.name;
  const secondName = fallbackCards[1]?.name;

  const firstInfo = firstName
    ? getFallbackCardInfo(firstName, normalizedLanguage)
    : null;

  const secondInfo = secondName
    ? getFallbackCardInfo(secondName, normalizedLanguage)
    : null;

  let theme;
  let synthesis;
  let takeaway;

  if (normalizedLanguage === "vi") {
    theme =
      "Một khoảng dừng để nhìn rõ điều đang diễn ra bên dưới bề mặt và chọn bước tiếp theo phù hợp với chính mình.";

    if (firstInfo && secondInfo && spreadType === "daily") {
      synthesis = `Sự đối chiếu giữa ${firstName} và ${secondName} gợi ra một khoảng cách giữa điều dễ nhìn thấy và điều đang thực sự cần được lắng nghe. ${firstInfo.perspective} ${secondInfo.perspective}`;
      takeaway = `${firstInfo.advice} ${secondInfo.advice}`;
    } else {
      synthesis =
        "Các lá bài cùng gợi về một tiến trình trong đó sự sáng rõ đến từ việc quan sát, chấp nhận và điều chỉnh thay vì cố kiểm soát mọi thứ ngay lập tức.";
      takeaway =
        "Hãy tập trung vào điều bạn có thể lựa chọn hôm nay. Một bước nhỏ nhưng chân thật vẫn có giá trị hơn việc chờ đợi một câu trả lời hoàn hảo.";
    }
  } else {
    theme =
      "A moment to look beneath the surface, recognize what is actually unfolding, and choose your next step with greater clarity.";

    if (firstInfo && secondInfo && spreadType === "daily") {
      synthesis = `The contrast between ${firstName} and ${secondName} suggests a gap between what is easiest to see and what deserves deeper attention. ${firstInfo.perspective} ${secondInfo.perspective}`;
      takeaway = `${firstInfo.advice} ${secondInfo.advice}`;
    } else {
      synthesis =
        "The cards point toward a process where clarity grows through observation, acceptance, and adjustment rather than through trying to control every outcome immediately.";
      takeaway =
        "Focus on what you can choose today. One small, honest step can be more useful than waiting for a perfect answer.";
    }
  }

  return {
    theme,
    cards: fallbackCards,
    synthesis,
    takeaway,
  };
}