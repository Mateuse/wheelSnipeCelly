# Prompt user for post name, topic, and subtopics
$postName = Read-Host -Prompt 'Enter the name of the post'
$postTopic = Read-Host -Prompt 'Enter the topic of the post'
$subtopicsInput = Read-Host -Prompt 'Enter the subtopics separated by commas'
$subtopicsArray = $subtopicsInput -split '\s*,\s*'

# Date and Slug
$currentDate = Get-Date -Format "yyyy-MM-ddTHH:mm:ss-07:00"
$postSlug = $postName -replace '-', '\s+'

# Create the Markdown file
$postSlug = ($postName -replace '\s+', '-').ToLower()

# Front matter
$frontMatter = @"
---
title: "$postName"
date: $currentDate
topic: "$postTopic"
summary: "This is a summary."
subtopic: ["$($subtopicsArray -join '", "')"]
draft: true
type: "post"
---
"@
# Write the front matter to the new post file
$frontMatter | Set-Content -Path $postPath

# Function to create a topic file if it doesn't exist
Function Create-TopicFile ($topicName) {
    $topicSlug = ($topicName -replace '\s+', '-').ToLower()
    $topicPath = ".\content\topics\$topicSlug.md"
    if (-not (Test-Path -Path $topicPath)) {
        $newTopicFrontMatter = @"
---
title: "$topicName"
name: "$topicName"
slug: "$topicSlug"
description: "Default Description"
image: "/topics/$topicSlug.jpg"
draft: false
---
"@
        $newTopicFrontMatter | Set-Content -Path $topicPath
        Write-Host "Added new topic $topicName to content/topics."
    }
}

# Check and create topic file for the main topic
Create-TopicFile -topicName $postTopic

# Check and create topic files for subtopics
foreach ($subtopic in $subtopicsArray) {
    Create-TopicFile -topicName $subtopic
}
# Create the Markdown file
$postPath = ".\content\posts\$postSlug.md"

# Create folder for images in static directory
$imageFolderPath = ".\static\posts\$postSlug"
if (-not (Test-Path -Path $imageFolderPath)) {
    New-Item -ItemType Directory -Path $imageFolderPath
}

# Rest of the script remains unchanged


Write-Host "Post created successfully."
