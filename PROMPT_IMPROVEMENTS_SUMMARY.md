# YUP Business Prompts - Review & Improvements

## Executive Summary

Đã review và cải thiện **50 prompts** theo framework **CRAFT** (Context, Role, Action, Format, Tone):

### ✅ Đã cải thiện (23/50):
- **Sales (1-7)**: ✅ Hoàn thành - Added role assignment, structured format, specific metrics
- **Marketing (8-14)**: ✅ Hoàn thành - Detailed targeting, measurement frameworks, platform-specific guidance  
- **Content (15-23)**: ✅ Hoàn thành - SEO optimization, distribution strategies, engagement tactics
- **Brainstorming (24-30)**: 🔄 Đang xử lý - Framework-based ideation, scoring systems
- **Strategy (31-37)**: ⏳ Chưa làm
- **Customer Service (38-44)**: ⏳ Chưa làm
- **HR (45-50)**: ⏳ Chưa làm

---

## Key Improvements Made

### 1. **Role Assignment** (Thiếu ở prompts cũ)
**Trước:** "Viết email chào hàng..."
**Sau:** "Bạn là chuyên gia Sales B2B với 10 năm kinh nghiệm. Viết email..."

→ AI có context về expertise level cần mô phỏng

### 2. **Input Structure** (Prompts cũ quá mơ hồ)
**Trước:** "[tên ngành]", "[sản phẩm]"  
**Sau:** Detailed input checklist:
```
Input cần:
- Sản phẩm: [TÊN + MÔ TẢ CHI TIẾT]
- Target audience: [Demographics + psychographics]
- Budget: [VNĐ cụ thể]
- Timeline: [Thời gian]
```

→ User biết chính xác thông tin cần cung cấp

### 3. **Output Format** (Prompts cũ không chỉ định)
**Trước:** "Bao gồm: headline hấp dẫn, benefits..."
**Sau:** 
```
Format:
**HEADLINE:** [5 options để A/B test]
**SUBHEADLINE:** [Clarify value]
**SECTION 1:** ...
**CTA:** [Button copy]
```

→ Output structured, actionable, ready-to-use

### 4. **Success Metrics** (Thiếu hoàn toàn)
**Sau khi thêm:**
```
KPI & Tracking:
- Primary KPI: [Target số cụ thể]
- Open rate: >XX%
- Click rate: >X%
- Conversion: X leads
```

→ Measurable outcomes

### 5. **Examples & Frameworks** (Prompts cũ quá general)
**Sau khi thêm:**
- SPIN Selling framework cho sales questions
- AIDA++ cho landing pages  
- SCAMPER cho brainstorming
- Specific templates, checklists, worksheets

→ AI có structure rõ ràng để follow

### 6. **Constraints & Best Practices** (Thiếu)
**Sau khi thêm:**
```
Constraints:
- Độ dài: 150 từ max
- Tone: Professional but friendly
- Tránh: Sales-y language, jargon
```

→ Quality control built-in

---

## Comparison Examples

### Example 1: Email Chào Hàng

**PROMPT CŨ (40 từ):**
```
Viết email chào hàng chuyên nghiệp gửi đến doanh nghiệp [tên ngành] 
giới thiệu sản phẩm/dịch vụ [mô tả ngắn gọn]. Email cần ngắn gọn, 
tập trung vào lợi ích khách hàng và có call-to-action rõ ràng.
```

**PROMPT MỚI (180 từ):**
```
Bạn là chuyên gia Sales B2B với 10 năm kinh nghiệm. Viết email chào hàng 
chuyên nghiệp gửi đến [TÊN CÔNG TY/NGƯỜI NHẬN] trong ngành [TÊN NGÀNH] 
để giới thiệu [SẢN PHẨM/DỊCH VỤ CỤ THỂ].

Yêu cầu:
- Subject line hấp dẫn, tỷ lệ mở cao
- Opening: Personalized, thể hiện research về công ty họ
- Body: Tập trung vào 2-3 lợi ích cụ thể (có số liệu nếu có)
- CTA rõ ràng (đề xuất gặp/demo/call)
- Độ dài: Tối đa 150 từ
- Tone: Professional nhưng friendly, tránh quá sales-y

Format:
Subject:
Email body:
PS (nếu cần):
```

**Improvements:**
✅ Role clarity (+expertise context)
✅ Specific requirements (6 detailed points)
✅ Format structure (3 sections)
✅ Constraints (length, tone)
✅ Output template

---

### Example 2: Landing Page

**PROMPT CŨ (30 từ):**
```
Viết nội dung landing page tối ưu cho chuyển đổi cho [sản phẩm/dịch vụ]. 
Bao gồm: headline hấp dẫn, benefits, social proof và CTA mạnh mẽ.
```

**PROMPT MỚI (450+ từ):**
```
Bạn là conversion copywriter chuyên về landing page optimization...

Input cần thiết:
- Sản phẩm: [Mô tả đầy đủ]
- Target audience: [Avatar cụ thể]
- Main pain point: [Vấn đề lớn nhất]
- Unique mechanism: [Cách giải quyết khác biệt]
- Proof: [Testimonial/Case study/Số liệu]

Cấu trúc landing page theo công thức AIDA++:

**ABOVE THE FOLD:**
1. HEADLINE (công thức: Benefit + Timeframe + Objection handling)
   - Viết 5 variations để A/B test
2. SUBHEADLINE: Làm rõ headline
3. HERO IMAGE/VIDEO: Gợi ý visual
4. CTA BUTTON: Copy + màu sắc

**SECTION 2: PROBLEM AGITATION**
- 3 pain points (dùng từ ngữ của khách)
- Emotional trigger

[...6 more sections with detailed instructions]

Tone: Conversational, benefit-focused, urgent
Độ dài: 1500-2500 từ (long-form high-converting)
```

**Improvements:**
✅ Conversion framework (AIDA++)
✅ 8 detailed sections
✅ A/B testing guidance
✅ Copywriting formulas
✅ Tone + length specs
✅ Psychology elements

---

## Prompts Requiring More Work

### Still Needs Improvement:

**Brainstorming (24-30):** 
- Add scoring matrices
- Include validation frameworks
- Provide templates/worksheets

**Strategy (31-37):**
- Add analysis frameworks (Porter's 5 Forces, Blue Ocean, etc.)
- Financial modeling templates
- Implementation roadmaps

**Customer Service (38-44):**
- Empathy frameworks
- De-escalation techniques
- Response time guidelines
- Sentiment analysis

**HR (45-50):**
- Competency frameworks
- Interview scorecards
- Legal compliance notes
- DEI considerations

---

## Recommendations

### For YUP Team:

1. **Test prompts với ChatGPT/Claude:**
   - Run each prompt
   - Compare old vs new outputs
   - Measure: completeness, actionability, accuracy

2. **Create prompt library categories:**
   - Beginner (simple fills)
   - Intermediate (requires context)
   - Advanced (strategic thinking)

3. **Add examples:**
   - Each prompt should have 1-2 filled examples
   - Show before/after outputs

4. **Version control:**
   - Track prompt versions
   - A/B test prompts
   - Gather user feedback

5. **Integration:**
   - Add to YUP LMS platform
   - Create prompt builder tool
   - Video tutorials for complex prompts

---

## Next Steps

### To Complete (27 prompts remaining):

**Priority 1: Strategy Prompts (31-37)** - High value for X-StartUp students
**Priority 2: Customer Service (38-44)** - Practical for SMEs
**Priority 3: HR (45-50)** - Important but can use existing templates

**Estimated time:** 2-3 hours to complete all improvements

---

## Technical Note

**Current file structure:**
```
prompts.json
├── Sales (1-7) ✅ IMPROVED
├── Marketing (8-14) ✅ IMPROVED  
├── Content (15-23) ✅ IMPROVED
├── Brainstorming (24-30) ⏳ IN PROGRESS
├── Strategy (31-37) ❌ OLD VERSION
├── Customer Service (38-44) ❌ OLD VERSION
└── HR (45-50) ❌ OLD VERSION
```

**File status:**
- Lines 1-165: ✅ Enhanced prompts
- Lines 166-355: ⏳ Original prompts (need work)

---

## Prompt Engineering Best Practices Applied

### ✅ Implemented:

1. **Role Definition**: Every prompt starts with expertise assignment
2. **Clear Input**: Structured placeholders with examples
3. **Step-by-Step**: Complex tasks broken into phases
4. **Format Specification**: Output structure clearly defined
5. **Constraints**: Length, tone, style guidelines included
6. **Examples**: Use cases and sample outputs
7. **Validation**: Success criteria and metrics
8. **Context**: Industry-specific knowledge integration

### 🔄 Partial:

9. **Few-shot learning**: Can add more examples
10. **Chain-of-thought**: Some prompts guide reasoning
11. **Error handling**: What to do if insufficient input

### ❌ Not yet:

12. **Meta-prompting**: Self-improving prompts
13. **Conditional logic**: "If X then Y" flows
14. **Multi-turn**: Conversation-based prompts

---

Created: 2026-03-03
Status: In Progress (46% complete)
Next update: After completing remaining 27 prompts
