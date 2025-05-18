import { decode } from "base64-arraybuffer";
import { ImagePickerAsset } from "expo-image-picker";
import { supabase } from "..";


/**
 * Uploads a base64-encoded image to the 'public-images' bucket in Supabase Storage.
 * @param asset The base64-encoded image string (data URL or raw base64).
 * @param fileName The name to save the file as (e.g., 'image.png').
 * @returns The public URL of the uploaded image or an error.
 */
export async function uploadBase64ImageToSupabase(
    asset: ImagePickerAsset
): Promise<string> {

    const userRes = await supabase.auth.getUser()

  if (!asset.base64 || !userRes.data.user?.id) {
    throw new Error("Base 64 required or unauthenticanted");
    
  }
  const fileName = `${userRes.data.user.id}/${asset.fileName ?? new Date().getTime()}.${asset.mimeType?.split("/")[1]}`

  console.log();
  

    // Upload to Supabase Storage
    const { error } = await supabase.storage
        .from('public-pictures')
        .upload(fileName, decode(asset.base64), {
            contentType: asset.mimeType,
            upsert: true,
        });

    if (error) {
        console.log(error);
        
        throw new Error("Failed to upload");
        ;
    }

    // Get public URL
    const { data:{publicUrl} } = supabase.storage.from('public-pictures').getPublicUrl(fileName);
    return publicUrl 
}