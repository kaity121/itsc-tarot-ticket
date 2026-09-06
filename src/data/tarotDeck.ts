import { TarotCardData, QuestionPreset, SpreadPerspective } from '../types';
import { deepNormalize } from '../utils/text';

const RAW_MAJOR_ARCANA: TarotCardData[] = [
  {
    "id": "m00",
    "name": "The Fool",
    "nameVi": "Kẻ Khờ",
    "numeral": "0",
    "suit": "Major",
    "element": "Air",
    "image": "/cards/m00.jpg",
    "keywords": [
      "Beginnings",
      "Spontaneity",
      "Innocence",
      "Audacity"
    ],
    "keywordsVi": [
      "Khởi Đầu Mới",
      "Tự Nhiên",
      "Hồn Nhiên",
      "Dũng Cảm"
    ],
    "summary": "Standing at the threshold with open hands, unburdened by past calculations.",
    "summaryVi": "Đứng trước ngưỡng cửa cuộc đời với đôi tay rộng mở, không vướng bận toan tính quá khứ.",
    "contrastPerspective": {
      "apparent": "Careless wandering with no safety net or guaranteed outcome.",
      "actual": "A profound release of cynicism that invites true serendipity and courage."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự lông bông bất cẩn, không lưới bảo hiểm và chẳng có cam kết thành công.",
      "actual": "Sự giải phóng triệt để nỗi hoài nghi, mở lối cho lòng dũng cảm và kỳ tích."
    },
    "symbol": "cliff-sun",
    "modernNote": "Start before you think you are 100% prepared. Experience only compiles in motion.",
    "modernNoteVi": "Hãy bắt đầu ngay trước khi nghĩ mình đã sẵn sàng 100%. Kinh nghiệm chỉ tích lũy khi hành động."
  },
  {
    "id": "m01",
    "name": "The Magician",
    "nameVi": "Ảo Thuật Gia",
    "numeral": "I",
    "suit": "Major",
    "element": "Air",
    "image": "/cards/m01.jpg",
    "keywords": [
      "Resourcefulness",
      "Willpower",
      "Manifestation",
      "Focus"
    ],
    "keywordsVi": [
      "Khả Năng Tháo Vát",
      "Ý Chí",
      "Hiện Thực Hóa",
      "Tập Trung"
    ],
    "summary": "Directing active agency to transmute abstract concepts into tangible reality.",
    "summaryVi": "Điều hướng năng lượng chủ động để biến ý niệm trừu tượng thành hiện thực hữu hình.",
    "contrastPerspective": {
      "apparent": "A magical sleight of hand or extraordinary stroke of luck.",
      "actual": "Disciplined application of simple tools already resting on your table."
    },
    "contrastPerspectiveVi": {
      "apparent": "Mánh khóe ảo thuật kỳ bí hoặc vận may tình cờ từ trên trời rơi xuống.",
      "actual": "Ứng dụng có kỷ luật những công cụ giản đơn đã nằm sẵn trên bàn của bạn."
    },
    "symbol": "infinity-wand",
    "modernNote": "You do not need more tools; you need clearer intention for the ones you have.",
    "modernNoteVi": "Bạn không cần thêm nhiều công cụ mới; bạn cần ý niệm rõ ràng hơn cho những thứ sẵn có."
  },
  {
    "id": "m02",
    "name": "The High Priestess",
    "nameVi": "Nữ Đại Tư Tế",
    "numeral": "II",
    "suit": "Major",
    "element": "Water",
    "image": "/cards/m02.jpg",
    "keywords": [
      "Intuition",
      "The Unseen",
      "Stillness",
      "Subconscious"
    ],
    "keywordsVi": [
      "Trực Giác",
      "Bí Ẩn Vô Hình",
      "Tĩnh Lặng",
      "Tiềm Thức"
    ],
    "summary": "Guardianship of internal knowing that resides underneath conscious noise.",
    "summaryVi": "Người nắm giữ sự thấu hiểu nội tâm nằm bên dưới sự ồn ào của ý thức.",
    "contrastPerspective": {
      "apparent": "Passivity, indecision, or silence that borders on withdrawal.",
      "actual": "Deep cognitive incubation, synthesizing truths before words exist for them."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự thụ động, do dự hoặc im lặng như thể đang trốn tránh thế giới.",
      "actual": "Quá trình ấp ủ nhận thức sâu sắc, chắt lọc chân lý trước khi ngôn từ kịp định hình."
    },
    "symbol": "crescent-veil",
    "modernNote": "Do not hurry the verdict. Let the water calm so you can see down to the pebble.",
    "modernNoteVi": "Đừng vội vã đưa ra phán quyết. Hãy để mặt nước lắng yên, bạn sẽ nhìn thấy viên sỏi dưới đáy."
  },
  {
    "id": "m03",
    "name": "The Empress",
    "nameVi": "Hoàng Hậu",
    "numeral": "III",
    "suit": "Major",
    "element": "Earth",
    "image": "/cards/m03.jpg",
    "keywords": [
      "Abundance",
      "Sensory Bloom",
      "Nurture",
      "Creativity"
    ],
    "keywordsVi": [
      "Trù Phú",
      "Nở Rộ Giác Quan",
      "Nuôi Dưỡng",
      "Sáng Tạo"
    ],
    "summary": "The soil that allows complex living ideas to gestate, breathe, and blossom.",
    "summaryVi": "Mảnh đất màu mỡ cho phép những ý tưởng sống động được ấp ủ, hít thở và nở hoa.",
    "contrastPerspective": {
      "apparent": "Unproductive leisure or slow progress that misses aggressive deadlines.",
      "actual": "Nutrient-rich rest allowing root networks to expand before the visible bloom."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự an nhàn vô bổ hoặc tiến độ chậm chạp làm trễ thời hạn gắt gao.",
      "actual": "Thời gian nghỉ ngơi giàu dưỡng chất giúp bộ rễ lan rộng trước khi trổ hoa rực rỡ."
    },
    "symbol": "wheat-womb",
    "modernNote": "Nourish the environment instead of screaming at the seedling to grow faster.",
    "modernNoteVi": "Hãy bồi đắp môi trường xung quanh thay vì sốt ruột thúc ép mầm non lớn nhanh."
  },
  {
    "id": "m04",
    "name": "The Emperor",
    "nameVi": "Hoàng Đế",
    "numeral": "IV",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m04.jpg",
    "keywords": [
      "Structure",
      "Authority",
      "Boundaries",
      "Stability"
    ],
    "keywordsVi": [
      "Cấu Trúc",
      "Uy Quyền",
      "Ranh Giới",
      "Ổn Định"
    ],
    "summary": "The deliberate foundation that protects vulnerability from chaos.",
    "summaryVi": "Nền móng vững chắc che chở những điều dễ tổn thương khỏi cơn hỗn loạn.",
    "contrastPerspective": {
      "apparent": "Rigid inflexibility and tyrannical suppression of free spontaneity.",
      "actual": "Essential scaffolding that creates safety and lets talent execute reliably."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự bảo thủ cứng nhắc và kìm hãm sự tự do sáng tạo.",
      "actual": "Bộ khung giàn giáo thiết yếu tạo ra an toàn để tài năng tự tin tỏa sáng."
    },
    "symbol": "stone-throne",
    "modernNote": "Structure is not a prison; it is the banks of a river that prevent a flood.",
    "modernNoteVi": "Kỷ luật không phải là ngục tù; nó chính là bờ đê giữ cho dòng sông không tràn ngập lụt."
  },
  {
    "id": "m05",
    "name": "The Hierophant",
    "nameVi": "Giáo Hoàng",
    "numeral": "V",
    "suit": "Major",
    "element": "Earth",
    "image": "/cards/m05.jpg",
    "keywords": [
      "Lineage",
      "Institutions",
      "Mentorship",
      "Tradition"
    ],
    "keywordsVi": [
      "Truyền Thống",
      "Tổ Chức",
      "Sư Phụ / Dẫn Dắt",
      "Quy Chuẩn"
    ],
    "summary": "Codified wisdom accumulated through countless generational iterations.",
    "summaryVi": "Trí tuệ đúc kết qua vô vàn chu kỳ của các thế hệ đi trước.",
    "contrastPerspective": {
      "apparent": "Outdated dogma suffocating progressive individual innovation.",
      "actual": "Time-tested benchmarks preventing you from reinventing flat tires."
    },
    "contrastPerspectiveVi": {
      "apparent": "Giáo điều lỗi thời bóp nghẹt tư duy đột phá cá nhân.",
      "actual": "Hệ quy chuẩn đã qua thử thách thời gian giúp bạn không mất công sáng chế lại bánh xe."
    },
    "symbol": "crossed-keys",
    "modernNote": "Learn the canonical rules flawlessly before you attempt to deconstruct them.",
    "modernNoteVi": "Hãy học và nắm vững các quy tắc nền tảng trước khi muốn phá cách chúng."
  },
  {
    "id": "m06",
    "name": "The Lovers",
    "nameVi": "Tình Nhân",
    "numeral": "VI",
    "suit": "Major",
    "element": "Air",
    "image": "/cards/m06.jpg",
    "keywords": [
      "Values",
      "Alignment",
      "Sacred Choice",
      "Vulnerability"
    ],
    "keywordsVi": [
      "Giá Trị Cốt Lõi",
      "Đồng Điệu",
      "Lựa Chọn Thiêng Liêng",
      "Chân Thật"
    ],
    "summary": "A definitive crossroads where commitment to one path leaves another behind.",
    "summaryVi": "Ngã rẽ mang tính quyết định, nơi sự cam kết với một con đường đồng nghĩa với buông bỏ lối đi khác.",
    "contrastPerspective": {
      "apparent": "A superficial romantic attraction or passive swoon of infatuation.",
      "actual": "A rigorous alignment of personal ethics tested under difficult conditions."
    },
    "contrastPerspectiveVi": {
      "apparent": "Cơn say nắng lãng mạn thoáng qua hay cảm xúc bồng bột nhất thời.",
      "actual": "Sự định hình chuẩn mực đạo đức và giá trị sống được thử thách trong thực tế."
    },
    "symbol": "angel-duality",
    "modernNote": "Every authentic choice requires grieving the unchosen alternatives.",
    "modernNoteVi": "Mỗi lựa chọn chân thực đều đòi hỏi bạn dám chấp nhận từ bỏ các phương án khác."
  },
  {
    "id": "m07",
    "name": "The Chariot",
    "nameVi": "Chiến Xa",
    "numeral": "VII",
    "suit": "Major",
    "element": "Water",
    "image": "/cards/m07.jpg",
    "keywords": [
      "Determination",
      "Vector",
      "Overcoming",
      "Integration"
    ],
    "keywordsVi": [
      "Quyết Tâm",
      "Định Hướng",
      "Vượt Ngưỡng",
      "Tập Hợp Năng Lượng"
    ],
    "summary": "Harnessing opposing internal drives and aiming them at a single objective.",
    "summaryVi": "Ghìm giữ hai luồng động lực đối lập trong tâm trí và hướng thẳng tới mục tiêu duy nhất.",
    "contrastPerspective": {
      "apparent": "Brute force aggression steamrolling over subtle nuance.",
      "actual": "Exquisite balance: steady hands steering conflicting impulses in harmony."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự hung hăng thô bạo muốn san phẳng mọi chi tiết tinh tế.",
      "actual": "Sự thăng bằng đỉnh cao: bàn tay vững chãi dẫn dắt các xung lực mâu thuẫn cùng tiến bước."
    },
    "symbol": "sphinx-steed",
    "modernNote": "Momentum cures inertia. Pick the vector and drive through the friction.",
    "modernNoteVi": "Gia tốc sẽ xóa tan sức ỳ. Hãy chọn hướng đi và dấn thân vượt qua lực cản."
  },
  {
    "id": "m08",
    "name": "Strength",
    "nameVi": "Sức Mạnh",
    "numeral": "VIII",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m08.jpg",
    "keywords": [
      "Gentle Mastery",
      "Patience",
      "Compassion",
      "Courage"
    ],
    "keywordsVi": [
      "Lòng Nhẫn Nại",
      "Lòng Trắc Ẩn",
      "Làm Chủ Cảm Xúc",
      "Bản Lĩnh"
    ],
    "summary": "Subduing primal terror not with iron shackles, but with an open palm.",
    "summaryVi": "Hóa giải cơn sợ hãi nguyên thủy không phải bằng xiềng xích, mà bằng bàn tay mở rộng vị tha.",
    "contrastPerspective": {
      "apparent": "Lacking toughness, being too soft to survive competitive arenas.",
      "actual": "The supreme endurance of emotional resilience that outlasts violent spasms."
    },
    "contrastPerspectiveVi": {
      "apparent": "Thiếu cứng rắn, quá mềm lòng không thể sinh tồn nơi cạnh tranh khốc liệt.",
      "actual": "Sức bền phi thường của sự điềm tĩnh, tồn tại lâu bền hơn mọi cơn cuồng nộ ngắn hạn."
    },
    "symbol": "tamed-lion",
    "modernNote": "Do not choke the beast in yourself; feed it well and train it patiently.",
    "modernNoteVi": "Đừng cố bóp nghẹt phần hoang dại trong mình; hãy chăm sóc nó đúng cách và kiên nhẫn cảm hóa."
  },
  {
    "id": "m09",
    "name": "The Hermit",
    "nameVi": "Ẩn Sĩ",
    "numeral": "IX",
    "suit": "Major",
    "element": "Earth",
    "image": "/cards/m09.jpg",
    "keywords": [
      "Solitude",
      "Introspection",
      "Inner Lantern",
      "Pruning"
    ],
    "keywordsVi": [
      "Tĩnh Lặng Một Mình",
      "Soi Rọi Nội Tâm",
      "Ngọn Đèn Soi Lối",
      "Thanh Lọc"
    ],
    "summary": "Stepping off the crowded highway to inspect your own coordinates.",
    "summaryVi": "Rời khỏi dòng người tấp nập để nhìn lại tọa độ của chính bản thân.",
    "contrastPerspective": {
      "apparent": "Antisocial alienation, bitterness, or useless disconnection.",
      "actual": "Strategic silence: eliminating noise so the faint signal can be registered."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự cô lập trốn tránh xã hội, cay đắng và mất kết nối vô ích.",
      "actual": "Khoảng lặng chiến lược: lọc bỏ tạp âm để tín hiệu chân thực nhất vang lên rõ nét."
    },
    "symbol": "staff-lantern",
    "modernNote": "The answers you are doomscrolling for are written on the inside of your eyelids.",
    "modernNoteVi": "Câu trả lời bạn mải miết tìm kiếm trên màn hình thực ra đang khắc sâu trong tâm trí bạn."
  },
  {
    "id": "m10",
    "name": "Wheel of Fortune",
    "nameVi": "Bánh Xe Số Phận",
    "numeral": "X",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m10.jpg",
    "keywords": [
      "Cyclicality",
      "Transience",
      "Adaptability",
      "Equanimity"
    ],
    "keywordsVi": [
      "Quy Luật Vần Xoay",
      "Vô Thường",
      "Khả Năng Thích Ứng",
      "Bình Thản"
    ],
    "summary": "The relentless rotation of systemic shifts beyond individual command.",
    "summaryVi": "Sự xoay vần bất biến của những biến động hệ thống vượt ngoài tầm kiểm soát cá nhân.",
    "contrastPerspective": {
      "apparent": "Helpless victimhood at the mercy of chaotic random rollouts.",
      "actual": "Deep serenity: knowing the wheel turns both down AND up again."
    },
    "contrastPerspectiveVi": {
      "apparent": "Tâm thế nạn nhân bất lực trước trò đùa ngẫu nhiên của số phận.",
      "actual": "Sự bình thản sâu sắc: hiểu rằng bánh xe luôn quay xuống rồi lại nâng lên."
    },
    "symbol": "turning-wheel",
    "modernNote": "Do not base your self-worth on the crest of a wave or the depth of a trough.",
    "modernNoteVi": "Đừng định giá bản thân dựa trên đỉnh cao của con sóng hay vực sâu của đáy nước."
  },
  {
    "id": "m11",
    "name": "Justice",
    "nameVi": "Công Lý",
    "numeral": "XI",
    "suit": "Major",
    "element": "Air",
    "image": "/cards/m11.jpg",
    "keywords": [
      "Equilibrium",
      "Causality",
      "Radical Honesty",
      "Accountability"
    ],
    "keywordsVi": [
      "Cân Bằng",
      "Luật Nhân Quả",
      "Trung Thực Tuyệt Đối",
      "Trách Nhiệm"
    ],
    "summary": "The blade that cleaves rationalization from the bedrock of cause and effect.",
    "summaryVi": "Lưỡi kiếm phân minh tách rời sự biện hộ khỏi quy luật nhân quả thép.",
    "contrastPerspective": {
      "apparent": "Cold, punitive vengeance designed to shame and punish mistakes.",
      "actual": "Objective calibration: reality snapping back to balance without malice."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự trừng phạt lạnh lùng nhằm chì chiết và làm bẽ mặt sai sót.",
      "actual": "Sự tái cân bằng khách quan: hiện thực quay về trạng thái cân bằng không chút thù hằn."
    },
    "symbol": "sword-scales",
    "modernNote": "Stop arguing with gravity. Acknowledge your inputs and own the outputs.",
    "modernNoteVi": "Đừng tranh cãi với trọng lực. Hãy thẳng thắn nhận diện nguyên nhân để đón nhận kết quả."
  },
  {
    "id": "m12",
    "name": "The Hanged Man",
    "nameVi": "Kẻ Treo Ngược",
    "numeral": "XII",
    "suit": "Major",
    "element": "Water",
    "image": "/cards/m12.jpg",
    "keywords": [
      "Suspension",
      "Inverted View",
      "Surrender",
      "Patience"
    ],
    "keywordsVi": [
      "Khoảng Chững Lại",
      "Đổi Góc Nhìn",
      "Buông Bỏ Kiểm Soát",
      "Kiên Định"
    ],
    "summary": "Voluntary pause that reveals the absurdity of previous frantic pursuits.",
    "summaryVi": "Khoảng dừng tự nguyện giúp nhận ra sự vô lý của những cuộc săn đuổi điên cuồng trước đó.",
    "contrastPerspective": {
      "apparent": "A humiliating stall, loss of velocity, or shameful defeat.",
      "actual": "An inverted vantage point making visible what upright panic concealed."
    },
    "contrastPerspectiveVi": {
      "apparent": "Cú khựng lại bẽ bàng, sự mất đà hoặc thất bại đáng xấu hổ.",
      "actual": "Góc nhìn đảo ngược soi sáng những điều mà sự hoảng loạn lúc đứng thẳng đã che khuất."
    },
    "symbol": "inverted-tree",
    "modernNote": "When pushing harder produces zero progress, try releasing the grip completely.",
    "modernNoteVi": "Khi càng gồng sức càng bế tắc, hãy thử thả lỏng hoàn toàn đôi bàn tay."
  },
  {
    "id": "m13",
    "name": "Death",
    "nameVi": "Chuyển Hóa",
    "numeral": "XIII",
    "suit": "Major",
    "element": "Water",
    "image": "/cards/m13.jpg",
    "keywords": [
      "Transformation",
      "Closure",
      "Composting",
      "Renewal"
    ],
    "keywordsVi": [
      "Chuyển Hóa",
      "Khép Lại",
      "Tái Sinh",
      "Đổi Mới"
    ],
    "summary": "The autumn scythe clearing expired foliage to enrich the soil for spring.",
    "summaryVi": "Lưỡi hái mùa thu dọn sạch những cành lá khô héo để ủ màu mỡ cho vụ mùa xuân tới.",
    "contrastPerspective": {
      "apparent": "Catastrophic ruin, irreversible devastation, and finality.",
      "actual": "The vital shedding of an outgrown shell that was suffocating your evolution."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự sụp đổ thảm khốc, mất mát vĩnh viễn không thể cứu vãn.",
      "actual": "Sự lột xác sống còn khỏi chiếc vỏ chật chội đang bóp nghẹt sự trưởng thành của bạn."
    },
    "symbol": "rising-sun-skull",
    "modernNote": "Do not perform CPR on an expired chapter. Let it dissolve gracefully.",
    "modernNoteVi": "Đừng cố gắng hô hấp nhân tạo cho một chương sách đã khép lại. Hãy để nó ra đi trong êm đềm."
  },
  {
    "id": "m14",
    "name": "Temperance",
    "nameVi": "Tiết Chế",
    "numeral": "XIV",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m14.jpg",
    "keywords": [
      "Alchemy",
      "Synthesis",
      "Moderation",
      "Flow"
    ],
    "keywordsVi": [
      "Hòa Hợp Giữa Dòng",
      "Tổng Hợp",
      "Điều Độ",
      "Dòng Chảy Tự Nhiên"
    ],
    "summary": "The careful pouring between vessels, creating gold from discordant waters.",
    "summaryVi": "Sự rót qua rót lại cẩn trọng giữa hai chiếc bình, tinh luyện vàng ròng từ dòng nước trái chiều.",
    "contrastPerspective": {
      "apparent": "Boring, lukewarm compromise that forfeits bold passion and spark.",
      "actual": "Master-level alchemy: weaving polarities into an indestructible alloy."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự thỏa hiệp nhạt nhòa, tầm thường làm mất đi ngọn lửa nhiệt huyết.",
      "actual": "Thuật giả kim bậc thầy: kết hợp các mặt đối lập thành một hợp kim bất khả chiến bại."
    },
    "symbol": "flowing-urns",
    "modernNote": "Extreme remedies create extreme rebound problems. Find the sustainable pace.",
    "modernNoteVi": "Biện pháp cực đoan luôn kéo theo phản ứng ngược cực đoan. Hãy chọn nhịp độ bền vững."
  },
  {
    "id": "m15",
    "name": "The Devil",
    "nameVi": "Cám Dỗ",
    "numeral": "XV",
    "suit": "Major",
    "element": "Earth",
    "image": "/cards/m15.jpg",
    "keywords": [
      "Shadow Bondage",
      "Illusion",
      "Material Grip",
      "Awareness"
    ],
    "keywordsVi": [
      "Xiềng Xích Vô Hình",
      "Ảo Tưởng Trói Buộc",
      "Vật Chất & Ám Ảnh",
      "Thức Tỉnh"
    ],
    "summary": "Chains slung loosely around necks that can be slipped off at any second.",
    "summaryVi": "Những sợi xích lỏng lẻo quanh cổ mà bạn hoàn toàn có thể tự tháo bỏ bất cứ giây phút nào.",
    "contrastPerspective": {
      "apparent": "Absolute enslavement to external circumstances and irresistible impulses.",
      "actual": "A consensual contract with comfort: you are trading autonomy for numbness."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự lệ thuộc tuyệt đối vào hoàn cảnh ngoại cảnh và thói quen khó cưỡng.",
      "actual": "Một thỏa hiệp ngầm với vùng an toàn: bạn đang đánh đổi tự do để lấy sự tê dại tạm thời."
    },
    "symbol": "loose-chains",
    "modernNote": "Look at the lock on your prison cell; notice it was never actually bolted shut.",
    "modernNoteVi": "Hãy nhìn kỹ ổ khóa ngục giam của bạn; nhận ra rằng cánh cửa đó chưa từng bị chốt bao giờ."
  },
  {
    "id": "m16",
    "name": "The Tower",
    "nameVi": "Ngọn Tháp",
    "numeral": "XVI",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m16.jpg",
    "keywords": [
      "Deconstruction",
      "Shattered Illusion",
      "Flash Truth",
      "Liberation"
    ],
    "keywordsVi": [
      "Sự Thật Bừng Sáng",
      "Sụp Đổ Ảo Tưởng",
      "Giải Thoát",
      "Tái Thiết Nền Tảng"
    ],
    "summary": "The lightning bolt striking the crown of a fortress built upon sandy hubris.",
    "summaryVi": "Tia chớp giáng xuống đỉnh tòa thành được dựng xây trên sự kiêu ngạo mong manh.",
    "contrastPerspective": {
      "apparent": "Unmitigated disaster tearing apart everything you labored to construct.",
      "actual": "A violent mercy: destroying the false edifice before it crushed you beneath it."
    },
    "contrastPerspectiveVi": {
      "apparent": "Tai họa giáng xuống phá hủy mọi thành quả bạn đã dày công gây dựng.",
      "actual": "Một sự cứu rỗi mạnh mẽ: phá hủy lớp vỏ giả tạo trước khi nó sập xuống đè bẹp bạn."
    },
    "symbol": "lightning-spire",
    "modernNote": "Only what was untrue fell today. Whatever remains is your real foundation.",
    "modernNoteVi": "Hôm nay chỉ những điều giả tạo mới sụp đổ. Những gì còn sót lại mới chính là nền tảng thực."
  },
  {
    "id": "m17",
    "name": "The Star",
    "nameVi": "Ngôi Sao",
    "numeral": "XVII",
    "suit": "Major",
    "element": "Air",
    "image": "/cards/m17.jpg",
    "keywords": [
      "Grace",
      "Renewal",
      "Clarity",
      "Unmasked Hope"
    ],
    "keywordsVi": [
      "Hi Vọng Thuần Khiết",
      "Hồi Sinh",
      "Thanh Bình",
      "Nguồn Cảm Hứng"
    ],
    "summary": "Pouring pure spring water onto earth and pool under an open celestial canopy.",
    "summaryVi": "Rót dòng nước nguồn mát lành tưới mát mặt đất dưới vòm trời đêm ngàn vì sao.",
    "contrastPerspective": {
      "apparent": "Naive, wishful fantasy disconnected from harsh ground realities.",
      "actual": "Unconditional clarity: restoring belief after the storm has washed the dust away."
    },
    "contrastPerspectiveVi": {
      "apparent": "Mộng mơ ngây thơ xa rời thực tế gai góc của cuộc sống.",
      "actual": "Niềm tin sáng tỏ vô điều kiện: hồi sinh sự kiên định sau khi bão giông đã gột rửa bụi mờ."
    },
    "symbol": "seven-stars",
    "modernNote": "Breathe again. The worst storm has passed, and your path is quietly illuminated.",
    "modernNoteVi": "Hãy hít thở thật sâu. Cơn bão tồi tệ nhất đã qua đi, và con đường phía trước đang sáng tỏ."
  },
  {
    "id": "m18",
    "name": "The Moon",
    "nameVi": "Mặt Trăng",
    "numeral": "XVIII",
    "suit": "Major",
    "element": "Water",
    "image": "/cards/m18.jpg",
    "keywords": [
      "Subconscious Mirage",
      "Intuition",
      "Distortion",
      "Deep Waters"
    ],
    "keywordsVi": [
      "Ảo Ảnh Tiềm Thức",
      "Trực Giác Sâu Kín",
      "Biến Dạng Tưởng Tượng",
      "Bí Ẩn"
    ],
    "summary": "The crustacean crawling from the abyss while dogs bay at the lunar reflection.",
    "summaryVi": "Sinh vật bò lên từ đáy nước sâu trong khi bầy chó cất tiếng sủa bóng trăng dưới hồ.",
    "contrastPerspective": {
      "apparent": "Paralyzing fear of hidden threats and impending treachery.",
      "actual": "Your imagination projecting old traumas onto neutral shadows in the hallway."
    },
    "contrastPerspectiveVi": {
      "apparent": "Nỗi sợ tê liệt trước những hiểm họa vô hình và sự phản bội rình rập.",
      "actual": "Trí tưởng tượng đang phóng chiếu những vết thương cũ lên chiếc bóng vô hại trên tường."
    },
    "symbol": "crustacean-towers",
    "modernNote": "Do not make binding life choices when fear has magnified the silhouettes.",
    "modernNoteVi": "Đừng đưa ra quyết định hệ trọng khi nỗi sợ đang phóng đại bóng tối xung quanh bạn."
  },
  {
    "id": "m19",
    "name": "The Sun",
    "nameVi": "Mặt Trời",
    "numeral": "XIX",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m19.jpg",
    "keywords": [
      "Clarity",
      "Vitality",
      "Joyful Truth",
      "Confidence"
    ],
    "keywordsVi": [
      "Sáng Tỏ Rạng Ngời",
      "Sinh Lực",
      "Chân Lý Hân Hoan",
      "Tự Tin"
    ],
    "summary": "The child riding the white horse under clear luminous skies with arms outstretched.",
    "summaryVi": "Đứa trẻ cưỡi tuấn mã trắng dưới vòm trời rực rỡ, vòng tay dang rộng đón ánh bình minh.",
    "contrastPerspective": {
      "apparent": "Oversimplified cheerfulness or an oblivious lack of depth.",
      "actual": "Total lucidity: the highest truth is joyful, transparent, and effortlessly bright."
    },
    "contrastPerspectiveVi": {
      "apparent": "Sự lạc quan tếu táo nông cạn hoặc thiếu chiều sâu thực tế.",
      "actual": "Sự sáng tỏ trọn vẹn: chân lý tối thượng luôn giản dị, trong trẻo và rạng ngời."
    },
    "symbol": "radiant-sun-steed",
    "modernNote": "Own your brilliance without self-deprecation. Step fully into your own clear light.",
    "modernNoteVi": "Hãy đón nhận giá trị của mình mà không cần tự ti. Tự tin bước vào luồng sáng của chính bạn."
  },
  {
    "id": "m20",
    "name": "Judgement",
    "nameVi": "Thức Tỉnh",
    "numeral": "XX",
    "suit": "Major",
    "element": "Fire",
    "image": "/cards/m20.jpg",
    "keywords": [
      "Awakening",
      "Calling",
      "Reckoning",
      "Integration"
    ],
    "keywordsVi": [
      "Thức Tỉnh Lương Tri",
      "Tiếng Gọi Nội Tâm",
      "Khép Lại Vòng Lặp",
      "Tái Sinh"
    ],
    "summary": "The clear trumpet sounding across open graves, calling souls into alignment.",
    "summaryVi": "Hồi kèn vang vọng giữa không gian tĩnh mịch, đánh thức linh hồn bước vào sự hòa hợp.",
    "contrastPerspective": {
      "apparent": "Terrifying final evaluation exposing all past sins and flaws.",
      "actual": "The liberating summons to stop hiding behind small, outdated self-narratives."
    },
    "contrastPerspectiveVi": {
      "apparent": "Cuộc phán xét kinh hoàng phơi bày mọi sai lầm và khiếm khuyết trong quá khứ.",
      "actual": "Tiếng gọi giải thoát nhắc bạn ngừng trốn tránh sau những câu chuyện nhỏ bé đã cũ kỹ."
    },
    "symbol": "angel-trumpet",
    "modernNote": "You have answered the trial. Stand up, shake off the old dust, and step forth.",
    "modernNoteVi": "Bạn đã vượt qua bài thử thách. Hãy đứng dậy, phủi sạch bụi trần và bước tiếp."
  },
  {
    "id": "m21",
    "name": "The World",
    "nameVi": "Thế Giới",
    "numeral": "XXI",
    "suit": "Major",
    "element": "Earth",
    "image": "/cards/m21.jpg",
    "keywords": [
      "Wholeness",
      "Completion",
      "Cosmic Dance",
      "Achievement"
    ],
    "keywordsVi": [
      "Toàn Vẹn",
      "Viên Mãn",
      "Vũ Điệu Vũ Trụ",
      "Thành Tựu"
    ],
    "summary": "The dancer in the green wreath surrounded by the four guardians of the cosmos.",
    "summaryVi": "Vũ công uyển chuyển giữa vòng nguyệt quế xanh, bao bọc bởi bốn biểu tượng hộ mệnh của vũ trụ.",
    "contrastPerspective": {
      "apparent": "The sad conclusion of an epic adventure and the fear of starting over.",
      "actual": "Full integration: you are leaving this cycle with every lesson etched in starlight."
    },
    "contrastPerspectiveVi": {
      "apparent": "Hồi kết ngậm ngùi của một hành trình và nỗi lo âu phải bắt đầu lại từ đầu.",
      "actual": "Sự hòa nhập trọn vẹn: bạn bước ra khỏi chu kỳ này với từng bài học đã khắc sâu vào tâm khảm."
    },
    "symbol": "wreath-dancer",
    "modernNote": "Celebrate this milestone thoroughly. You did what you once thought was impossible.",
    "modernNoteVi": "Hãy tự hào chúc mừng dấu mốc này. Bạn đã làm được điều mà trước đây từng nghĩ là không thể."
  }
];

const RAW_MINOR_ARCANA: TarotCardData[] = [
  {
    "id": "wands-1",
    "name": "Ace of Wands",
    "nameVi": "Ách Gậy",
    "numeral": "1",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-1.jpg",
    "keywords": [
      "Inspiration",
      "New Spark",
      "Creative Force",
      "Potential"
    ],
    "keywordsVi": [
      "Cảm Hứng",
      "Tia Lửa Mới",
      "Sức Sáng Tạo",
      "Tiềm Năng"
    ],
    "summary": "The energy of Wands expressed through Ace of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Ách Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-1",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-2",
    "name": "Two of Wands",
    "nameVi": "Hai Gậy",
    "numeral": "2",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-2.jpg",
    "keywords": [
      "Planning",
      "Future Horizon",
      "Foresight",
      "Decision"
    ],
    "keywordsVi": [
      "Kế Hoạch",
      "Tầm Nhìn Xa",
      "Dự Liệu",
      "Quyết Định"
    ],
    "summary": "The energy of Wands expressed through Two of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Hai Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-2",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-3",
    "name": "Three of Wands",
    "nameVi": "Ba Gậy",
    "numeral": "3",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-3.jpg",
    "keywords": [
      "Expansion",
      "Foresight",
      "Overseas",
      "Momentum"
    ],
    "keywordsVi": [
      "Mở Rộng",
      "Tầm Nhìn",
      "Vươn Ra Xa",
      "Gia Tốc"
    ],
    "summary": "The energy of Wands expressed through Three of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Ba Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-3",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-4",
    "name": "Four of Wands",
    "nameVi": "Bốn Gậy",
    "numeral": "4",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-4.jpg",
    "keywords": [
      "Celebration",
      "Homecoming",
      "Harmony",
      "Milestone"
    ],
    "keywordsVi": [
      "Ăn Mừng",
      "Bình Yên Mái Ấm",
      "Hòa Hợp",
      "Cột Mốc"
    ],
    "summary": "The energy of Wands expressed through Four of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Bốn Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-4",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-5",
    "name": "Five of Wands",
    "nameVi": "Năm Gậy",
    "numeral": "5",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-5.jpg",
    "keywords": [
      "Competition",
      "Creative Conflict",
      "Rivalry",
      "Friction"
    ],
    "keywordsVi": [
      "Cạnh Tranh",
      "Bất Đồng Sáng Tạo",
      "Xung Đột Nhẹ",
      "Cọ Xát"
    ],
    "summary": "The energy of Wands expressed through Five of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Năm Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-5",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-6",
    "name": "Six of Wands",
    "nameVi": "Sáu Gậy",
    "numeral": "6",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-6.jpg",
    "keywords": [
      "Triumph",
      "Recognition",
      "Public Acclaim",
      "Validation"
    ],
    "keywordsVi": [
      "Khải Hoàn",
      "Ghi Nhận",
      "Vinh Danh",
      "Tự Hào"
    ],
    "summary": "The energy of Wands expressed through Six of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Sáu Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-6",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-7",
    "name": "Seven of Wands",
    "nameVi": "Bảy Gậy",
    "numeral": "7",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-7.jpg",
    "keywords": [
      "Conviction",
      "Holding Ground",
      "Defensiveness",
      "Courage"
    ],
    "keywordsVi": [
      "Kiên Định",
      "Bảo Vệ Lập Trường",
      "Vững Vàng",
      "Can Trường"
    ],
    "summary": "The energy of Wands expressed through Seven of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Bảy Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-7",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-8",
    "name": "Eight of Wands",
    "nameVi": "Tám Gậy",
    "numeral": "8",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-8.jpg",
    "keywords": [
      "Swift Action",
      "Rapid Velocity",
      "Incoming News",
      "Flow"
    ],
    "keywordsVi": [
      "Hành Động Mau Lẹ",
      "Tốc Độ Cao",
      "Tin Nhắn Tới",
      "Dòng Chảy"
    ],
    "summary": "The energy of Wands expressed through Eight of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Tám Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-8",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-9",
    "name": "Nine of Wands",
    "nameVi": "Chín Gậy",
    "numeral": "9",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-9.jpg",
    "keywords": [
      "Resilience",
      "Grit",
      "Final Barrier",
      "Vigilance"
    ],
    "keywordsVi": [
      "Bền Bỉ",
      "Kiên Trì",
      "Chướng Ngại Cuối",
      "Cảnh Giác"
    ],
    "summary": "The energy of Wands expressed through Nine of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Chín Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-9",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-10",
    "name": "Ten of Wands",
    "nameVi": "Mười Gậy",
    "numeral": "10",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-10.jpg",
    "keywords": [
      "Overburden",
      "Heavy Responsibility",
      "Carrying Too Much",
      "Endurance"
    ],
    "keywordsVi": [
      "Quá Tải",
      "Gánh Nặng Trách Nhiệm",
      "Ôm Đồm",
      "Sức Chịu Đựng"
    ],
    "summary": "The energy of Wands expressed through Ten of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Mười Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-10",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-11",
    "name": "Page of Wands",
    "nameVi": "Tiểu Đồng Gậy",
    "numeral": "11",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-11.jpg",
    "keywords": [
      "Curiosity",
      "Exploration",
      "Fresh Idea",
      "Enthusiasm"
    ],
    "keywordsVi": [
      "Tò Mò",
      "Khám Phá",
      "Ý Tưởng Mới",
      "Hào Hứng"
    ],
    "summary": "The energy of Wands expressed through Page of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Tiểu Đồng Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-11",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-12",
    "name": "Knight of Wands",
    "nameVi": "Hiệp Sĩ Gậy",
    "numeral": "12",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-12.jpg",
    "keywords": [
      "Passionate Pursuit",
      "Bold Charge",
      "Restlessness",
      "Daring"
    ],
    "keywordsVi": [
      "Theo Đuổi Đam Mê",
      "Tiến Lên Táo Bạo",
      "Nhiệt Huyết",
      "Xông Xáo"
    ],
    "summary": "The energy of Wands expressed through Knight of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Hiệp Sĩ Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-12",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-13",
    "name": "Queen of Wands",
    "nameVi": "Nữ Hoàng Gậy",
    "numeral": "13",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-13.jpg",
    "keywords": [
      "Radiance",
      "Warm Confidence",
      "Self-Assurance",
      "Charisma"
    ],
    "keywordsVi": [
      "Tỏa Sáng",
      "Tự Tin Ấm Áp",
      "Lôi Cuốn",
      "Độc Lập"
    ],
    "summary": "The energy of Wands expressed through Queen of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Nữ Hoàng Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-13",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "wands-14",
    "name": "King of Wands",
    "nameVi": "Vua Gậy",
    "numeral": "14",
    "suit": "Wands",
    "element": "Fire",
    "image": "/cards/wands-14.jpg",
    "keywords": [
      "Visionary Leadership",
      "Execution",
      "Bold Inspiration",
      "Mastery"
    ],
    "keywordsVi": [
      "Lãnh Đạo Tầm Nhìn",
      "Thực Thi",
      "Truyền Cảm Hứng",
      "Làm Chủ"
    ],
    "summary": "The energy of Wands expressed through King of Wands: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Gậy thể hiện qua lá Vua Gậy: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "wands-14",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-1",
    "name": "Ace of Cups",
    "nameVi": "Ách Chén",
    "numeral": "1",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-1.jpg",
    "keywords": [
      "Emotional Awakening",
      "Compassion",
      "Abundant Love",
      "Intimacy"
    ],
    "keywordsVi": [
      "Đong Đầy Cảm Xúc",
      "Lòng Trắc Ẩn",
      "Tình Yêu Thuần Khiết",
      "Gắn Kết"
    ],
    "summary": "The energy of Cups expressed through Ace of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Ách Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-1",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-2",
    "name": "Two of Cups",
    "nameVi": "Hai Chén",
    "numeral": "2",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-2.jpg",
    "keywords": [
      "Mutual Resonance",
      "Partnership",
      "Shared Heart",
      "Reciprocity"
    ],
    "keywordsVi": [
      "Thấu Hiểu Đôi Bên",
      "Gắn Kết",
      "Đồng Điệu Trái Tim",
      "Tương Hỗ"
    ],
    "summary": "The energy of Cups expressed through Two of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Hai Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-2",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-3",
    "name": "Three of Cups",
    "nameVi": "Ba Chén",
    "numeral": "3",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-3.jpg",
    "keywords": [
      "Companionship",
      "Community",
      "Celebration",
      "Sisterhood"
    ],
    "keywordsVi": [
      "Tình Bạn Thân Thiết",
      "Cộng Đồng",
      "Niềm Vui Họp Mặt",
      "Sẻ Chia"
    ],
    "summary": "The energy of Cups expressed through Three of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Ba Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-3",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-4",
    "name": "Four of Cups",
    "nameVi": "Bốn Chén",
    "numeral": "4",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-4.jpg",
    "keywords": [
      "Apathy",
      "Discontent",
      "Missed Gift",
      "Contemplation"
    ],
    "keywordsVi": [
      "Trầm Lắng",
      "Chán Nản Tạm Thời",
      "Cơ Hội Bỏ Quên",
      "Suy Tưởng"
    ],
    "summary": "The energy of Cups expressed through Four of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Bốn Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-4",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-5",
    "name": "Five of Cups",
    "nameVi": "Năm Chén",
    "numeral": "5",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-5.jpg",
    "keywords": [
      "Grief",
      "Spilled Sorrow",
      "Looking Back",
      "Remaining Grace"
    ],
    "keywordsVi": [
      "Mất Mát",
      "Tiếc Nuối Quá Khứ",
      "Vết Thương Lòng",
      "Hy Vọng Còn Lại"
    ],
    "summary": "The energy of Cups expressed through Five of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Năm Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-5",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-6",
    "name": "Six of Cups",
    "nameVi": "Sáu Chén",
    "numeral": "6",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-6.jpg",
    "keywords": [
      "Nostalgia",
      "Sweet Memories",
      "Childhood Innocence",
      "Reunion"
    ],
    "keywordsVi": [
      "Hoài Niệm",
      "Kỷ Niệm Êm Đềm",
      "Hồn Nhiên Thơ Ấu",
      "Hội Ngộ"
    ],
    "summary": "The energy of Cups expressed through Six of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Sáu Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-6",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-7",
    "name": "Seven of Cups",
    "nameVi": "Bảy Chén",
    "numeral": "7",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-7.jpg",
    "keywords": [
      "Illusions",
      "Daydreams",
      "Overchoice",
      "Discernment"
    ],
    "keywordsVi": [
      "Ảo Tưởng",
      "Mơ Mộng Viển Vông",
      "Quá Nhiều Lựa Chọn",
      "Tỉnh Táo"
    ],
    "summary": "The energy of Cups expressed through Seven of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Bảy Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-7",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-8",
    "name": "Eight of Cups",
    "nameVi": "Tám Chén",
    "numeral": "8",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-8.jpg",
    "keywords": [
      "Walking Away",
      "Seeking Depth",
      "Letting Go",
      "Higher Path"
    ],
    "keywordsVi": [
      "Chủ Động Rời Đi",
      "Tìm Kiếm Chiều Sâu",
      "Buông Bỏ Vỏ Bọc",
      "Lối Đi Cao Hơn"
    ],
    "summary": "The energy of Cups expressed through Eight of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Tám Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-8",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-9",
    "name": "Nine of Cups",
    "nameVi": "Chín Chén",
    "numeral": "9",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-9.jpg",
    "keywords": [
      "Contentment",
      "Wished Fulfillment",
      "Savoring",
      "Quiet Joy"
    ],
    "keywordsVi": [
      "Mãn Nguyện",
      "Ước Nguyện Thành Toàn",
      "Tận Hưởng",
      "Bình Yên"
    ],
    "summary": "The energy of Cups expressed through Nine of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Chín Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-9",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-10",
    "name": "Ten of Cups",
    "nameVi": "Mười Chén",
    "numeral": "10",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-10.jpg",
    "keywords": [
      "Harmonious Home",
      "Serenity",
      "Deep Fulfillment",
      "Belonging"
    ],
    "keywordsVi": [
      "Mái Ấm Hòa Thuận",
      "An Yên Trọn Vẹn",
      "Gia Đình Hạnh Phúc",
      "Gắn Kết Sâu"
    ],
    "summary": "The energy of Cups expressed through Ten of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Mười Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-10",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-11",
    "name": "Page of Cups",
    "nameVi": "Tiểu Đồng Chén",
    "numeral": "11",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-11.jpg",
    "keywords": [
      "Gentle Curiosity",
      "Intuitive Spark",
      "Poetic Surprise",
      "Tender Heart"
    ],
    "keywordsVi": [
      "Trực Giác Chớm Nở",
      "Bất Ngờ Đáng Yêu",
      "Tâm Hồn Thi Sĩ",
      "Nhẹ Nhàng"
    ],
    "summary": "The energy of Cups expressed through Page of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Tiểu Đồng Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-11",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-12",
    "name": "Knight of Cups",
    "nameVi": "Hiệp Sĩ Chén",
    "numeral": "12",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-12.jpg",
    "keywords": [
      "Romantic Quest",
      "Heartfelt Delivery",
      "Idealism",
      "Sensitivity"
    ],
    "keywordsVi": [
      "Chuyến Đi Tình Cảm",
      "Gửi Trao Yêu Thương",
      "Lý Tưởng Hóa",
      "Nhạy Cảm"
    ],
    "summary": "The energy of Cups expressed through Knight of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Hiệp Sĩ Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-12",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-13",
    "name": "Queen of Cups",
    "nameVi": "Nữ Hoàng Chén",
    "numeral": "13",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-13.jpg",
    "keywords": [
      "Intuitive Depth",
      "Emotional Empathy",
      "Gentle Safe Harbor",
      "Wisdom"
    ],
    "keywordsVi": [
      "Chiều Sâu Trực Giác",
      "Thấu Cảm Bao Dung",
      "Bến Đỗ Bình Yên",
      "Hiền Hòa"
    ],
    "summary": "The energy of Cups expressed through Queen of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Nữ Hoàng Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-13",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "cups-14",
    "name": "King of Cups",
    "nameVi": "Vua Chén",
    "numeral": "14",
    "suit": "Cups",
    "element": "Water",
    "image": "/cards/cups-14.jpg",
    "keywords": [
      "Emotional Balance",
      "Compassionate Anchor",
      "Equanimity",
      "Counsel"
    ],
    "keywordsVi": [
      "Cân Bằng Cảm Xúc",
      "Điểm Tựa Vững Vàng",
      "Bình Thản",
      "Cố Vấn Sáng Suốt"
    ],
    "summary": "The energy of Cups expressed through King of Cups: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Chén thể hiện qua lá Vua Chén: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "cups-14",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-1",
    "name": "Ace of Swords",
    "nameVi": "Ách Kiếm",
    "numeral": "1",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-1.jpg",
    "keywords": [
      "Mental Breakthrough",
      "Cutting Truth",
      "Clarity",
      "Raw Intellect"
    ],
    "keywordsVi": [
      "Đột Phá Tư Duy",
      "Sự Thật Sắc Bén",
      "Sáng Tỏ",
      "Trí Tuệ Sắc Sảo"
    ],
    "summary": "The energy of Swords expressed through Ace of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Ách Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-1",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-2",
    "name": "Two of Swords",
    "nameVi": "Hai Kiếm",
    "numeral": "2",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-2.jpg",
    "keywords": [
      "Stalemate",
      "Blindfolded Weighing",
      "Defensive Peace",
      "Decision Needed"
    ],
    "keywordsVi": [
      "Bế Tắc Do Dự",
      "Bịt Mắt Cân Đo",
      "Hòa Bình Tạm Thời",
      "Cần Lựa Chọn"
    ],
    "summary": "The energy of Swords expressed through Two of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Hai Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-2",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-3",
    "name": "Three of Swords",
    "nameVi": "Ba Kiếm",
    "numeral": "3",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-3.jpg",
    "keywords": [
      "Heartbreak",
      "Pierced Sorrow",
      "Painful Clarity",
      "Healing Beginning"
    ],
    "keywordsVi": [
      "Tổn Thương Sâu Sắc",
      "Nỗi Đau Rõ Nét",
      "Sự Thật Buốt Giá",
      "Khởi Đầu Chữa Lành"
    ],
    "summary": "The energy of Swords expressed through Three of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Ba Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-3",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-4",
    "name": "Four of Swords",
    "nameVi": "Bốn Kiếm",
    "numeral": "4",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-4.jpg",
    "keywords": [
      "Sanctuary Rest",
      "Mental Recovery",
      "Quiet Repose",
      "Stillness"
    ],
    "keywordsVi": [
      "Nghỉ Ngơi Dưỡng Thần",
      "Hồi Phục Tâm Trí",
      "Tĩnh Lặng",
      "Lắng Đọng"
    ],
    "summary": "The energy of Swords expressed through Four of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Bốn Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-4",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-5",
    "name": "Five of Swords",
    "nameVi": "Năm Kiếm",
    "numeral": "5",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-5.jpg",
    "keywords": [
      "Hollow Victory",
      "Ego Conflict",
      "Costly Win",
      "Walk Away"
    ],
    "keywordsVi": [
      "Chiến Thắng Trống Rỗng",
      "Xung Đột Cái Tôi",
      "Trả Giá Quá Đắt",
      "Nên Rút Lui"
    ],
    "summary": "The energy of Swords expressed through Five of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Năm Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-5",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-6",
    "name": "Six of Swords",
    "nameVi": "Sáu Kiếm",
    "numeral": "6",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-6.jpg",
    "keywords": [
      "Crossing Troubled Waters",
      "Transition",
      "Moving to Calm",
      "Guidance"
    ],
    "keywordsVi": [
      "Vượt Qua Giông Bão",
      "Chuyển Giao",
      "Tiến Về Vùng Êm Ả",
      "Có Người Dẫn Lối"
    ],
    "summary": "The energy of Swords expressed through Six of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Sáu Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-6",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-7",
    "name": "Seven of Swords",
    "nameVi": "Bảy Kiếm",
    "numeral": "7",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-7.jpg",
    "keywords": [
      "Strategy",
      "Tactical Stealth",
      "Lone Path",
      "Discernment"
    ],
    "keywordsVi": [
      "Chiến Lược Kín Đáo",
      "Hành Xử Khôn Khéo",
      "Bước Đi Độc Lập",
      "Cảnh Giác"
    ],
    "summary": "The energy of Swords expressed through Seven of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Bảy Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-7",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-8",
    "name": "Eight of Swords",
    "nameVi": "Tám Kiếm",
    "numeral": "8",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-8.jpg",
    "keywords": [
      "Self-Imposed Prison",
      "Mental Entrapment",
      "Unfastened Blindfold",
      "Agency"
    ],
    "keywordsVi": [
      "Nhà Tù Tâm Trí",
      "Tự Trói Buộc Mình",
      "Dải Bịt Mắt Lỏng",
      "Khơi Dậy Quyền Lực"
    ],
    "summary": "The energy of Swords expressed through Eight of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Tám Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-8",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-9",
    "name": "Nine of Swords",
    "nameVi": "Chín Kiếm",
    "numeral": "9",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-9.jpg",
    "keywords": [
      "Night Anxiety",
      "Overthinking",
      "Catastrophizing",
      "Dawn Awaits"
    ],
    "keywordsVi": [
      "Cơn Lo Âu Trong Đêm",
      "Suy Diễn Quá Mức",
      "Ám Ảnh Tinh Thần",
      "Bình Minh Đang Tới"
    ],
    "summary": "The energy of Swords expressed through Nine of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Chín Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-9",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-10",
    "name": "Ten of Swords",
    "nameVi": "Mười Kiếm",
    "numeral": "10",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-10.jpg",
    "keywords": [
      "Finality",
      "Rock Bottom",
      "Exhaustion Over",
      "New Sunrise"
    ],
    "keywordsVi": [
      "Điểm Chạm Đáy",
      "Nỗi Đau Khép Lại",
      "Cơn Bĩ Cực Qua Đi",
      "Hừng Đông Đón Chờ"
    ],
    "summary": "The energy of Swords expressed through Ten of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Mười Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-10",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-11",
    "name": "Page of Swords",
    "nameVi": "Tiểu Đồng Kiếm",
    "numeral": "11",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-11.jpg",
    "keywords": [
      "Keen Mind",
      "Sharp Inquisitiveness",
      "Vigilance",
      "Mental Hunger"
    ],
    "keywordsVi": [
      "Tư Duy Sắc Sảo",
      "Ham Học Hỏi",
      "Cảnh Giác Nhanh Nhạy",
      "Tìm Tòi Chân Lý"
    ],
    "summary": "The energy of Swords expressed through Page of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Tiểu Đồng Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-11",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-12",
    "name": "Knight of Swords",
    "nameVi": "Hiệp Sĩ Kiếm",
    "numeral": "12",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-12.jpg",
    "keywords": [
      "Decisive Impulse",
      "Direct Truth",
      "Blunt Drive",
      "Fearless Logic"
    ],
    "keywordsVi": [
      "Quyết Đoán Thẳng Thắn",
      "Tiến Nhanh Không Ngại",
      "Lý Trí Đanh Thép",
      "Không Khoan Nhượng"
    ],
    "summary": "The energy of Swords expressed through Knight of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Hiệp Sĩ Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-12",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-13",
    "name": "Queen of Swords",
    "nameVi": "Nữ Hoàng Kiếm",
    "numeral": "13",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-13.jpg",
    "keywords": [
      "Perceptive Wit",
      "Clear Boundaries",
      "Uncompromising Honesty",
      "Independence"
    ],
    "keywordsVi": [
      "Tuệ Giác Sắc Bén",
      "Ranh Giới Rõ Ràng",
      "Chân Thật Thẳng Thắn",
      "Độc Lập Tự Chủ"
    ],
    "summary": "The energy of Swords expressed through Queen of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Nữ Hoàng Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-13",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "swords-14",
    "name": "King of Swords",
    "nameVi": "Vua Kiếm",
    "numeral": "14",
    "suit": "Swords",
    "element": "Air",
    "image": "/cards/swords-14.jpg",
    "keywords": [
      "Intellectual Authority",
      "Fair Judgment",
      "Strategic Logic",
      "Clear Principle"
    ],
    "keywordsVi": [
      "Quyền Lực Trí Tuệ",
      "Phán Quyết Công Bằng",
      "Chiến Lược Sáng Suốt",
      "Nguyên Tắc Thép"
    ],
    "summary": "The energy of Swords expressed through King of Swords: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Kiếm thể hiện qua lá Vua Kiếm: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "swords-14",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-1",
    "name": "Ace of Pentacles",
    "nameVi": "Ách Tiền",
    "numeral": "1",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-1.jpg",
    "keywords": [
      "Tangible Seed",
      "New Opportunity",
      "Grounded Wealth",
      "Physical Health"
    ],
    "keywordsVi": [
      "Hạt Giống Hữu Hình",
      "Cơ Hội Thực Tế",
      "Tài Lộc Vững Chắc",
      "Sức Khỏe Đời Thực"
    ],
    "summary": "The energy of Pentacles expressed through Ace of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Ách Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-1",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-2",
    "name": "Two of Pentacles",
    "nameVi": "Hai Tiền",
    "numeral": "2",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-2.jpg",
    "keywords": [
      "Juggling Priorities",
      "Adaptability",
      "Dynamic Flow",
      "Resourcefulness"
    ],
    "keywordsVi": [
      "Cân Bằng Đa Nhiệm",
      "Thích Nghi Nhịp Nhàng",
      "Linh Hoạt",
      "Khéo Léo Xoay Xở"
    ],
    "summary": "The energy of Pentacles expressed through Two of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Hai Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-2",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-3",
    "name": "Three of Pentacles",
    "nameVi": "Ba Tiền",
    "numeral": "3",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-3.jpg",
    "keywords": [
      "Craftsmanship",
      "Collaborative Build",
      "Recognized Skill",
      "Team Synergy"
    ],
    "keywordsVi": [
      "Tay Nghề Tinh Xảo",
      "Hợp Tác Xây Dựng",
      "Kỹ Năng Được Công Nhận",
      "Phối Hợp Đồng Đội"
    ],
    "summary": "The energy of Pentacles expressed through Three of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Ba Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-3",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-4",
    "name": "Four of Pentacles",
    "nameVi": "Bốn Tiền",
    "numeral": "4",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-4.jpg",
    "keywords": [
      "Conserving Security",
      "Fear of Scarcity",
      "Holding Tight",
      "Financial Boundary"
    ],
    "keywordsVi": [
      "Giữ Gìn An Toàn",
      "Lo Sợ Thiếu Thốn",
      "Nắm Chặt Kiểm Soát",
      "Ranh Giới Tiền Bạc"
    ],
    "summary": "The energy of Pentacles expressed through Four of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Bốn Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-4",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-5",
    "name": "Five of Pentacles",
    "nameVi": "Năm Tiền",
    "numeral": "5",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-5.jpg",
    "keywords": [
      "Temporary Scarcity",
      "Feeling Cast Out",
      "Hidden Warmth Nearby",
      "Endurance"
    ],
    "keywordsVi": [
      "Thiếu Thốn Tạm Thời",
      "Cảm Giác Bơ Vơ",
      "Hơi Ấm Vẫn Ở Gần",
      "Cùng Vượt Qua"
    ],
    "summary": "The energy of Pentacles expressed through Five of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Năm Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-5",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-6",
    "name": "Six of Pentacles",
    "nameVi": "Sáu Tiền",
    "numeral": "6",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-6.jpg",
    "keywords": [
      "Balanced Generosity",
      "Reciprocal Flow",
      "Fair Giving",
      "Shared Abundance"
    ],
    "keywordsVi": [
      "Hào Phóng Đúng Mực",
      "Dòng Chảy Sẻ Chia",
      "Giúp Đỡ Công Bằng",
      "Đón Nhận Khiêm Tốn"
    ],
    "summary": "The energy of Pentacles expressed through Six of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Sáu Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-6",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-7",
    "name": "Seven of Pentacles",
    "nameVi": "Bảy Tiền",
    "numeral": "7",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-7.jpg",
    "keywords": [
      "Patient Assessment",
      "Watching Crops Grow",
      "Long-Term Investment",
      "Pause"
    ],
    "keywordsVi": [
      "Kiên Nhẫn Đánh Giá",
      "Chờ Mùa Thu Hoạch",
      "Đầu Tư Dài Hạn",
      "Dừng Lại Xem Xét"
    ],
    "summary": "The energy of Pentacles expressed through Seven of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Bảy Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-7",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-8",
    "name": "Eight of Pentacles",
    "nameVi": "Tám Tiền",
    "numeral": "8",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-8.jpg",
    "keywords": [
      "Diligent Mastery",
      "Dedicated Practice",
      "Refining Craft",
      "Focused Grind"
    ],
    "keywordsVi": [
      "Miệt Mài Rèn Luyện",
      "Chuyên Tâm Từng Chi Tiết",
      "Nâng Cao Tay Nghề",
      "Tập Trung Cao Độ"
    ],
    "summary": "The energy of Pentacles expressed through Eight of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Tám Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-8",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-9",
    "name": "Nine of Pentacles",
    "nameVi": "Chín Tiền",
    "numeral": "9",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-9.jpg",
    "keywords": [
      "Cultivated Autonomy",
      "Refined Solitude",
      "Enjoying Harvest",
      "Self-Sufficiency"
    ],
    "keywordsVi": [
      "Tự Chủ Vững Vàng",
      "Độc Lập Thư Thái",
      "Hưởng Trái Ngọt",
      "Phong Thái Tự Tin"
    ],
    "summary": "The energy of Pentacles expressed through Nine of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Chín Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-9",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-10",
    "name": "Ten of Pentacles",
    "nameVi": "Mười Tiền",
    "numeral": "10",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-10.jpg",
    "keywords": [
      "Generational Security",
      "Long-Term Legacy",
      "Family Anchor",
      "Abundant Foundation"
    ],
    "keywordsVi": [
      "Gia Tài Vững Bền",
      "Di Sản Lâu Dài",
      "Chỗ Dựa Vững Chãi",
      "Nền Tảng Đầy Đủ"
    ],
    "summary": "The energy of Pentacles expressed through Ten of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Mười Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-10",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-11",
    "name": "Page of Pentacles",
    "nameVi": "Tiểu Đồng Tiền",
    "numeral": "11",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-11.jpg",
    "keywords": [
      "Pragmatic Student",
      "Grounded Ambition",
      "Learning Practical Skills",
      "Reliability"
    ],
    "keywordsVi": [
      "Học Tập Thực Tế",
      "Hoài Bão Vững Vàng",
      "Rèn Luyện Kỹ Năng",
      "Đáng Tin Cậy"
    ],
    "summary": "The energy of Pentacles expressed through Page of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Tiểu Đồng Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-11",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-12",
    "name": "Knight of Pentacles",
    "nameVi": "Hiệp Sĩ Tiền",
    "numeral": "12",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-12.jpg",
    "keywords": [
      "Methodical Progress",
      "Unshakable Routine",
      "Patience",
      "Dependable Work"
    ],
    "keywordsVi": [
      "Tiến Bước Chắc Chắn",
      "Kỷ Luật Bền Bỉ",
      "Kiên Nhẫn",
      "Trách Nhiệm Đến Cùng"
    ],
    "summary": "The energy of Pentacles expressed through Knight of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Hiệp Sĩ Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-12",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-13",
    "name": "Queen of Pentacles",
    "nameVi": "Nữ Hoàng Tiền",
    "numeral": "13",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-13.jpg",
    "keywords": [
      "Grounded Warmth",
      "Practical Nurture",
      "Resourceful Comfort",
      "Sensory Ease"
    ],
    "keywordsVi": [
      "Bao Dung Thực Tế",
      "Chăm Sóc Ấm Áp",
      "Khéo Thu Xếp",
      "Cuộc Sống An Vui"
    ],
    "summary": "The energy of Pentacles expressed through Queen of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Nữ Hoàng Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-13",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  },
  {
    "id": "pentacles-14",
    "name": "King of Pentacles",
    "nameVi": "Vua Tiền",
    "numeral": "14",
    "suit": "Pentacles",
    "element": "Earth",
    "image": "/cards/pentacles-14.jpg",
    "keywords": [
      "Material Mastery",
      "Stable Wealth",
      "Protective Abundance",
      "Established Ground"
    ],
    "keywordsVi": [
      "Làm Chủ Vật Chất",
      "Sự Nghiệp Bền Vững",
      "Che Chở Vững Vàng",
      "Chỗ Đứng Vững Chắc"
    ],
    "summary": "The energy of Pentacles expressed through King of Pentacles: grounding intention into reality.",
    "summaryVi": "Năng lượng của bộ Tiền thể hiện qua lá Vua Tiền: chuyển hóa ý niệm thành hành động thực tế.",
    "contrastPerspective": {
      "apparent": "Viewing the current circumstance as an overwhelming obstacle or immediate threat.",
      "actual": "A valuable catalyst to refine your boundaries, practice patience, and sharpen focus."
    },
    "contrastPerspectiveVi": {
      "apparent": "Xem hoàn cảnh hiện tại như một vật cản nặng nề hoặc áp lực không lối thoát.",
      "actual": "Một cơ hội quý báu để rèn luyện ranh giới, giữ sự kiên định và tập trung đúng đích."
    },
    "symbol": "pentacles-14",
    "modernNote": "Trust the step right in front of you. Daily consistency outperforms sporadic intensity.",
    "modernNoteVi": "Hãy tin vào từng bước đi vững chắc ngay trước mắt. Kỷ luật đều đặn mỗi ngày luôn giá trị hơn sự bốc đồng nhất thời."
  }
];

export const MAJOR_ARCANA: TarotCardData[] = deepNormalize(RAW_MAJOR_ARCANA);
export const MINOR_ARCANA: TarotCardData[] = deepNormalize(RAW_MINOR_ARCANA);
export const FULL_TAROT_DECK: TarotCardData[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const DAILY_PERSPECTIVE_PAIRS: SpreadPerspective[] = deepNormalize([
  {
    id: 'apparent',
    label: 'What it appears to be',
    labelVi: 'Vẻ bề ngoài (Tưởng chừng là)',
    subtext: 'The surface-level fear, instinctive reaction, or obvious narrative.',
    subtextVi: 'Nỗi sợ bề mặt, phản xạ bản năng hoặc suy diễn tức thời.'
  },
  {
    id: 'actual',
    label: 'What it actually is',
    labelVi: 'Bản chất thực sự (Thực chất là)',
    subtext: 'The quiet underlying truth, unseen opportunity, or constructive orientation.',
    subtextVi: 'Sự thật tĩnh lặng ẩn sâu, cơ hội chưa nhận ra hoặc hướng đi tích cực.'
  }
]);

export const CLASSIC_POSITIONS: SpreadPerspective[] = deepNormalize([
  {
    id: 'past',
    label: 'Past Origins',
    labelVi: 'Cội Nguồn Quá Khứ',
    subtext: 'The foundational currents and subconscious habits leading to this question.',
    subtextVi: 'Dòng chảy nền tảng và thói quen vô thức dẫn đến câu hỏi hiện tại.'
  },
  {
    id: 'present',
    label: 'Present Ground',
    labelVi: 'Thực Tại Hôm Nay',
    subtext: 'Active tension, reality checks, and internal resource state right now.',
    subtextVi: 'Căng thẳng hiện diện, thực tế đang đối mặt và tài nguyên nội tâm lúc này.'
  },
  {
    id: 'future',
    label: 'Future Vector',
    labelVi: 'Khuynh Hướng Tương Lai',
    subtext: 'The natural trajectory if you apply clarity instead of reactive panic.',
    subtextVi: 'Chiều hướng tự nhiên nếu bạn hành động với sự sáng suốt thay vì hoảng sợ.'
  }
]);

export const QUESTION_PRESETS: QuestionPreset[] = deepNormalize([
  {
    id: 'career-direction',
    label: 'Career & Craft',
    labelVi: 'Công Việc & Định Hướng',
    category: 'Career',
    placeholder: 'Where is my craft calling for disciplined growth vs where am I burning out?',
    placeholderVi: 'Công việc của tôi cần sự rèn luyện bền bỉ ở đâu và tôi đang kiệt sức vì điều gì?'
  },
  {
    id: 'relationship-boundary',
    label: 'Relationship Tension',
    labelVi: 'Mối Quan Hệ & Ranh Giới',
    category: 'Love',
    placeholder: 'What unspoken dynamic is causing friction, and what does honest care require?',
    placeholderVi: 'Điều gì chưa được nói ra đang gây rạn nứt, và sự chân thành đòi hỏi tôi điều gì?'
  },
  {
    id: 'mindset-stuck',
    label: 'Mental Impasse',
    labelVi: 'Bế Tắc Tâm Trí',
    category: 'Mindset',
    placeholder: 'Which past fear is masquerading as reasonable caution today?',
    placeholderVi: 'Nỗi sợ nào trong quá khứ đang đội lốt sự cẩn trọng hợp lý trong hôm nay?'
  },
  {
    id: 'creative-resistance',
    label: 'Creative Resistance',
    labelVi: 'Sức Ỳ Sáng Tạo',
    category: 'Career',
    placeholder: 'What perfectionist trap is preventing me from publishing raw work?',
    placeholderVi: 'Chiếc bẫy cầu toàn nào đang ngăn cản tôi bắt tay vào hành động thực tế?'
  },
  {
    id: 'inner-alignment',
    label: 'Inner Alignment',
    labelVi: 'Đồng Điệu Nội Tâm',
    category: 'Mindset',
    placeholder: 'What value have I been neglecting in the pursuit of external validation?',
    placeholderVi: 'Giá trị sống nào tôi đã lãng quên khi mải mê tìm kiếm sự công nhận bên ngoài?'
  }
]);

export const getCardById = (id: string): TarotCardData | undefined => {
  return FULL_TAROT_DECK.find(c => c.id === id);
};

export const getRandomCards = (count: number = 2, fromFullDeck: boolean = true): TarotCardData[] => {
  const pool = fromFullDeck ? FULL_TAROT_DECK : FULL_TAROT_DECK.filter(c => c.suit === 'Major');
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
