-- Add pink_silver to the tag_material enum
ALTER TYPE tag_material ADD VALUE 'pink_silver';

-- Update TAG_SHAPES comment for reference
COMMENT ON TYPE tag_material IS 'brass=Round SM/LG, stainless(silver)=Round SM/LG + Bone, pink_silver=Heart LG only';